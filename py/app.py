import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS
DATABASE='fronttrips.db'
def get_db_connection():
    print('Obteniendo conexion...')
    conn=sqlite3.connect(DATABASE)
    conn.row_factory=sqlite3.Row
    return conn

def create_table():
    print('Creando la tabla excursiones...')
    conn=get_db_connection()
    cursor=conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS excursiones (
    codigo INTEGER PRIMARY KEY,
    descripcion TEXT NOT NULL,
    cantidad INTEGER NOT NULL,
    precio REAL NOT NULL
    ) ''')
    conn.commit()
    cursor.close()
    conn.close()

def create_database():
    print('Creando la BD....')
    conn=sqlite3.connect(DATABASE)
    conn.close()
    create_table()

create_database()

class Excursiones():
    def __init__(self,codigo,descripcion,cantidad,precio):
        self.codigo = codigo
        self.descripcion = descripcion
        self.cantidad = cantidad
        self.precio = precio
        
    
    def modificar_excursion(self,nueva_descripcion,nueva_cantidad,nuevo_precio):
        self.descripcion = nueva_descripcion
        self.cantidad = nueva_cantidad
        self.precio = nuevo_precio
        

class Inventario():
    def __init__(self):
        self.conexion=get_db_connection()
        self.cursor=self.conexion.cursor()

    def agregar_excursion(self,codigo,descripcion,cantidad,precio):
        excursion_existente=self.consultar_excursion(codigo)
        if excursion_existente:
            return jsonify({'message':'Ya existe una excursion con ese codigo'}),400
            
        sql=f'INSERT INTO excursiones VALUES ({codigo},"{descripcion}",{cantidad},{precio});'
        self.cursor.execute(sql)
        self.conexion.commit()
        return jsonify({'message':'Excursion agregada correctamente'}),200
    
    def consultar_excursion(self,codigo):
        sql=f'SELECT * FROM excursiones WHERE codigo={codigo};'
        self.cursor.execute(sql)
        row=self.cursor.fetchone()
        if row:
            codigo,descripcion,cantidad,precio=row
            return Excursiones(codigo,descripcion,cantidad,precio)
        return None
    
    
    def modificar_excursion(self,codigo,nueva_descripcion,nueva_cantidad,nuevo_precio):
        excursion=self.consultar_excursion(codigo)
        if excursion:
            excursion.modificar_excursion(nueva_descripcion,nueva_cantidad,nuevo_precio)
            sql=f'UPDATE excursiones SET descripcion="{nueva_descripcion}",cantidad={nueva_cantidad},precio={nuevo_precio} WHERE codigo={codigo};'
            self.cursor.execute(sql)
            self.conexion.commit()
            return jsonify({'message':'Excursion modificada exitosamente'}),200
        return jsonify({'message':'Excursion no encontrada'}),404
    
    def eliminar_excursion(self,codigo):
        sql=f'DELETE FROM excursiones WHERE codigo={codigo};'
        self.cursor.execute(sql)
        if self.cursor.rowcount>0:
            self.conexion.commit()
            return jsonify({'message:':'Excursion eliminada exitosamente'}),200
        return jsonify({'message':'Excursion no encontrada'}),404
       

    def listar_excursiones(self):
        self.cursor.execute('SELECT * FROM excursiones')
        rows=self.cursor.fetchall()
        excursiones=[]
        for row in rows:
            codigo,descripcion,cantidad,precio=row
            excursion={'codigo':codigo,'descripcion':descripcion,'cantidad':cantidad,'precio':precio}
            excursiones.append(excursion)
        return jsonify(excursiones),200
            


class Carrito():
    def __init__(self):
        self.conexion=sqlite3.connect('fronttrips.db')
        self.cursor=self.conexion.cursor()
        self.items=[]
    
    def agregar_ex(self,codigo,cantidad,inventario):
        excursion = inventario.consultar_excursion(codigo)
        if excursion is None:
            return jsonify({'message':'La excursion no existe'}),404
        if excursion.cantidad<cantidad:
            return jsonify({'message':'No hay excursiones en stock'}),400
        
        for item in self.items:
            if item.codigo==codigo:
                item.cantidad += cantidad
                sql=f'UPDATE excursiones SET cantidad = cantidad - {cantidad} WHERE codigo = {codigo};'
                self.cursor.execute(sql)
                self.conexion.commit()
                return jsonify({'message':'Excursion agregada al carrito'}),200
        nuevo_item=Excursiones(codigo,excursion.descripcion,cantidad,excursion.precio)
        self.items.append(nuevo_item)
        sql=f'UPDATE excursiones SET cantidad=cantidad - {cantidad} WHERE codigo={codigo};'
        self.cursor.execute(sql)
        self.conexion.commit()
        return jsonify({'message':'Excursion agregada al carrito'}),200
        
    
    def quitar_ex(self,codigo,cantidad,inventario):
        for item in self.items:
            if item.codigo==codigo:
                if cantidad>item.cantidad:
                    return jsonify({'message':'No hay suficientes excursiones en el carrito'}),400
                item.cantidad -= cantidad
                if item.cantidad == 0:
                    self.items.remove(item)

                sql=f'UPDATE excursiones SET cantidad=cantidad + {cantidad} WHERE codigo = {codigo};'
                self.cursor.execute(sql)
                self.conexion.commit()
                return jsonify({'message':'Excursion eliminada del carrito'}),200
            return jsonify({'message':'La excursion no está en el carrito'}),404
    
    def mostrar_carrito(self):
        excursiones_carrito=[]
        for item in self.items:
            excursion={'codigo':item.codigo,'descripcion':item.descripcion,'cantidad':item.cantidad,'precio':item.precio}
            excursiones_carrito.append(excursion)
        return jsonify(excursiones_carrito),200


app=Flask(__name__)
CORS(app)
carrito=Carrito()
inventario=Inventario()

@app.route('/excursiones/<int:codigo>', methods=['GET'])
def obtener_excursion(codigo):
    excursion=inventario.consultar_excursion(codigo)
    if excursion:
        return jsonify({
            'codigo': excursion.codigo,
            'descripcion':excursion.descripcion,
            'cantidad':excursion.cantidad,
            'precio':excursion.precio
        }),200
    return jsonify({'message':'Excursion no encontrada'}),404

@app.route('/')
def index():
    return 'API de Excursiones'

@app.route('/excursiones',methods=['GET'])
def obtener_excursiones():
    return inventario.listar_excursiones()

@app.route('/excursiones',methods=['POST'])
def agregar_excursion():
    codigo=request.json.get('codigo')
    descripcion=request.json.get('descripcion')
    cantidad=request.json.get('cantidad')
    precio=request.json.get('precio')
    return inventario.agregar_excursion(codigo,descripcion,cantidad,precio)

@app.route('/excursiones/<int:codigo>',methods=['PUT'])
def modificar_excursion(codigo):
    nueva_descripcion=request.json.get('descripcion')
    nueva_cantidad=request.json.get('cantidad')
    nuevo_precio=request.json.get('precio')
    return inventario.modificar_excursion(codigo,nueva_descripcion,nueva_cantidad,nuevo_precio)

@app.route('/excursiones/<int:codigo>',methods=['DELETE'])
def eliminar_excursion(codigo):
    return inventario.eliminar_excursion(codigo)

@app.route('/carrito',methods=['POST'])
def agregar_ex():
    codigo=request.json.get('codigo')
    cantidad=request.json.get('cantidad')
    inventario=Inventario()
    return carrito.agregar_ex(codigo,cantidad,inventario)

@app.route('/carrito',methods=['DELETE'])
def quitar_ex():
    codigo=request.json.get('codigo')
    cantidad=request.json.get('cantidad')
    inventario=Inventario()
    return carrito.quitar_ex(codigo,cantidad,inventario)

@app.route('/carrito',methods=['GET'])
def mostrar_carrito():
    return carrito.mostrar_carrito()

if __name__=='__main__':
    app.run()






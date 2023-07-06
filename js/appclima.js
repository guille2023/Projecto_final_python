const apiClima=Vue.createApp({
    data(){
        return{
            weather:[],
            base:'',
            main:[],
            name:''


        }
    },
    created(){
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=-34.603722&lon=-58.381592&appid=eddc9310db43224871f708ce53773be3&units=metric&lang=sp')
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            this.weather=data.weather
            this.main=data.main
            this.name=data.name

        })
        .catch(error=>console.log(error))
    }

}).mount('#clima')
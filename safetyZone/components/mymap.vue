<template>
        <div id="map"></div>
</template>

<script>
	import axios from "axios";

	export default{
		  head: {
		    script: [
		      {
		        src: 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.js',
		        integrity: 'sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==',
		        crossorigin: ""
		      }
		    ],
		    link: [
		      {
		        rel: 'stylesheet',
		        href: 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css',
		        integrity: "sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==",
		        crossorigin: ""
		      }
		    ]
		},

		data(){
			return{
				current_lat: '',
				current_lon: '',
                dustData: '',
			}
		},

		methods: {
		  dust_mark(res, map) {
            res.forEach( data =>{
                let lat = data.lat;
                let lon = data.lon;
                let name = data.name_th; //get point name
                let pm25 = data.pm25; //get pm2.5 volume
                let aqi_pm25 = data.pm25_aqi; //get pm2.5 aqi
                let time = data.log_datetime; //get time
                let sensor; //var to set sensor color

                    if(aqi_pm25<=50) sensor = 'https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2Fsensor%2Fgreen-point.png?alt=media&token=58bc70c6-de74-45a5-b406-8f0c33e80073';
                    else if(aqi_pm25<=100) sensor = 'https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2Fsensor%2Fyellow-point.png?alt=media&token=47609d47-ce10-455b-a2d1-5e4b46a1d0ba';
                    else if(aqi_pm25<=150) sensor = 'https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2Fsensor%2Forange-point.png?alt=media&token=446a1a4a-25a9-466c-bc0c-9ffec61b8083';
                    else sensor = 'https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2Fsensor%2Fred-point.png?alt=media&token=f8d62174-e75d-4974-ba6d-da3caf63db9d';

                    //set sensor on the map
                    let point = L.icon({
                        iconUrl: sensor, //icon url
                        iconSize: [12, 12] // size of the icon            
                    });

                    //drop sensor on the map
                   let dustBoy = L.marker([lat, lon], {icon: point}).addTo(map);

                    //set popup
                    dustBoy.bindPopup(
                        "<b>DustBoy Sensor</b>"
                        +"<br><b>Name:</b> "+name
                        +"<br><b>PM2.5:</b> "+pm25
                        +"<br><b>PM2.5 AQI:</b> "+aqi_pm25
                    );
                    
                    //set mouse hover action
                    dustBoy.on('mouseover', function (e) {
                        dustBoy.openPopup();
                    });
                    dustBoy.on('mouseout', function (e) {
                        dustBoy.closePopup();
                    });
            })
        },

        school_mark(map){
            let lat
            let lon
            let name
            let type = 'School'
            let pin ='https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2FsafetyZone%2Fschool_pin.png?alt=media&token=9a00b9e5-c699-4a2a-8c42-b249626c81b8'

            axios.get('https://safety-zone-c1ae5.firebaseio.com/safetyZone/school.json')
            .then( res=> {
                res.data.forEach(el=> {
                    lat = el.lat
                    lon = el.lon
                    name = el.name

                    //set school pin on the map
                    let point = L.icon({
                        iconUrl: pin, //icon url
                        iconSize: [35, 35] // size of the icon            
                    });

                    //drop pin on the map
                   let school_pin = L.marker([lat, lon], {icon: point}).addTo(map);

                    //set popup
                    school_pin.bindPopup(
                        "<b>"+type+"</b>"
                        +"<br><b>Name:</b> "+name
                    );
                    
                    //set mouse hover action
                    school_pin.on('mouseover', function (e) {
                        school_pin.openPopup();
                    });
                    school_pin.on('mouseout', function (e) {
                        school_pin.closePopup();
                    });

                })
            })
        },

        private_mark(map){
            let lat
            let lon
            let name
            let type = 'Private'
            let pin ='https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2FsafetyZone%2Fprivae_pin.png?alt=media&token=6e3b643a-d5a9-458a-bd94-0726dbd1053d'

            axios.get('https://safety-zone-c1ae5.firebaseio.com/safetyZone/private.json')
            .then( res=> {
                res.data.forEach(el=> {
                    lat = el.lat
                    lon = el.lon
                    name = el.name

                    //set school pin on the map
                    let point = L.icon({
                        iconUrl: pin, //icon url
                        iconSize: [35, 35] // size of the icon            
                    });

                    //drop pin on the map
                   let private_pin = L.marker([lat, lon], {icon: point}).addTo(map);

                    //set popup
                    private_pin.bindPopup(
                        "<b>"+type+"</b>"
                        +"<br><b>Name:</b> "+name
                    );
                    
                    //set mouse hover action
                    private_pin.on('mouseover', function (e) {
                        private_pin.openPopup();
                    });
                    private_pin.on('mouseout', function (e) {
                        private_pin.closePopup();
                    });
                })
            })
        },

        hospital_mark(map){
            let lat
            let lon
            let name
            let type = 'Hospital'
            let pin ='https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2FsafetyZone%2Fhospital_pin.png?alt=media&token=6acb47db-d9aa-4f3d-aa94-1b2fdeaa9270'

            axios.get('https://safety-zone-c1ae5.firebaseio.com/safetyZone/hospital.json')
            .then( res=> {
                res.data.forEach(el=> {
                    lat = el.lat
                    lon = el.lon
                    name = el.name

                    //set school pin on the map
                    let point = L.icon({
                        iconUrl: pin, //icon url
                        iconSize: [35, 35] // size of the icon            
                    });

                    //drop pin on the map
                   let hospital_pin = L.marker([lat, lon], {icon: point}).addTo(map);

                    //set popup
                    hospital_pin.bindPopup(
                        "<b>"+type+"</b>"
                        +"<br><b>Name:</b> "+name
                    );
                    
                    //set mouse hover action
                    hospital_pin.on('mouseover', function (e) {
                        hospital_pin.openPopup();
                    });
                    hospital_pin.on('mouseout', function (e) {
                        hospital_pin.closePopup();
                    });
                })
            })
        },

        userAdded_mark(map){
            let lat
            let lon
            let name
            let type
            let school_pin ='https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2FsafetyZone%2Fschool_pin.png?alt=media&token=9a00b9e5-c699-4a2a-8c42-b249626c81b8'
            let private_pin ='https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2FsafetyZone%2Fprivae_pin.png?alt=media&token=6e3b643a-d5a9-458a-bd94-0726dbd1053d'
            let hospital_pin ='https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2FsafetyZone%2Fhospital_pin.png?alt=media&token=6acb47db-d9aa-4f3d-aa94-1b2fdeaa9270'

            axios.get('https://safety-zone-c1ae5.firebaseio.com/safetyZone/userAdded.json')
            .then( res=>{
                res.data.forEach(el=> {
                    let point
                    lat = el.lat
                    lon = el.lon
                    name = el.sf_name
                    type = el.type

                    if(type==='School'){
                        point = L.icon({
                            iconUrl: school_pin, //icon url
                            iconSize: [35, 35] // size of the icon            
                        });
                    }else if(type==='Private'){
                        point = L.icon({
                            iconUrl: private_pin, //icon url
                            iconSize: [35, 35] // size of the icon 
                        });   
                    }else{
                        point = L.icon({
                            iconUrl: hospital_pin, //icon url
                            iconSize: [35, 35] // size of the icon  
                        });  
                    }

                    //drop pin on the map
                   let pin = L.marker([lat, lon], {icon: point}).addTo(map);

                    //set popup
                    pin.bindPopup(
                        "<b>"+type+"</b>"
                        +"<br><b>Name:</b> "+name
                    );
                    
                    //set mouse hover action
                    pin.on('mouseover', function (e) {
                        pin.openPopup();
                    });
                    pin.on('mouseout', function (e) {
                        pin.closePopup();
                    });
                })
            })
        }
	},

		mounted(){
            let map;

            // get location
            axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCzLAmL9pLpThOZ4HzoU2JfY7hAmPbukYI')
                .then(async res=> {
                    this.current_lat =  res.data.location.lat;
                    this.current_lon =  res.data.location.lng;

                    map = await L.map('map').setView([this.current_lat, this.current_lon], 12); //set map
                //get map
                await L.marker([this.current_lat, this.current_lon]).addTo(map);
                await L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
                    ,{
                        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                        maxZoom: 25,
                        id: 'mapbox/streets-v11',
                        accessToken: 'sk.eyJ1IjoicHBvb20iLCJhIjoiY2s1emtvN3QzMWZ3dzNrcnZwMDI1cHpwdSJ9.MD9eQUsDkHNVsY0mgXUGIA'
                    }).addTo(map);

                  })

            // get data and generate
			axios.get('https://safety-zone-c1ae5.firebaseio.com/basicSensorInfo/dustBoy.json')
			.then( async res=>{
                await this.dust_mark(res.data, map)
                await this.school_mark(map)
                await this.private_mark(map)
                await this.hospital_mark(map)
                await this.userAdded_mark(map)
			})
		}
	}
</script>

<style>
	#map{
		position: relative;
	    top: 2.5vh;
	    left: 1.5vw;
	    background-color: #fff;
	    width: 97vw;
	    height: 83vh;
	    border-radius: 5px;
    }
</style>
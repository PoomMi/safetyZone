<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://unpkg.com/leaflet@1.2.0/dist/leaflet.css",
      },
    ],
  },
  data() {
    return {
      school_pin:
        "https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2FsafetyZone%2Fschool_pin.png?alt=media&token=9a00b9e5-c699-4a2a-8c42-b249626c81b8",
      private_pin:
        "https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2FsafetyZone%2Fprivae_pin.png?alt=media&token=6e3b643a-d5a9-458a-bd94-0726dbd1053d",
      hospital_pin:
        "https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2FsafetyZone%2Fhospital_pin.png?alt=media&token=6acb47db-d9aa-4f3d-aa94-1b2fdeaa9270",
    };
  },
  methods: {
    dust_mark(data, map) {
      data.forEach((el) => {
        let lat = el.lat;
        let lon = el.lon;
        let name = el.name_th; //get point name
        let pm25 = el.pm25; //get pm2.5 volume
        let aqi_pm25 = el.pm25_aqi; //get pm2.5 aqi
        let time = el.log_datetime; //get time
        let sensor; //var to set sensor color
        if (aqi_pm25 <= 50)
          sensor =
            "https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2Fsensor%2Fgreen-point.png?alt=media&token=58bc70c6-de74-45a5-b406-8f0c33e80073";
        else if (aqi_pm25 <= 100)
          sensor =
            "https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2Fsensor%2Fyellow-point.png?alt=media&token=47609d47-ce10-455b-a2d1-5e4b46a1d0ba";
        else if (aqi_pm25 <= 150)
          sensor =
            "https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2Fsensor%2Forange-point.png?alt=media&token=446a1a4a-25a9-466c-bc0c-9ffec61b8083";
        else
          sensor =
            "https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2Fsensor%2Fred-point.png?alt=media&token=f8d62174-e75d-4974-ba6d-da3caf63db9d";
        //set sensor on the map
        let point = L.icon({
          iconUrl: sensor, //icon url
          iconSize: [12, 12], // size of the icon
        });
        //drop sensor on the map
        let dustBoy = L.marker([lat, lon], { icon: point }).addTo(map);
        //set popup
        dustBoy.bindPopup(
          "<b>DustBoy Sensor</b>" +
            "<br><b>Name:</b> " +
            name +
            "<br><b>PM2.5:</b> " +
            pm25 +
            "<br><b>PM2.5 AQI:</b> " +
            aqi_pm25
        );

        //set mouse hover action
        dustBoy.on("mouseover", function (e) {
          dustBoy.openPopup();
        });
        dustBoy.on("mouseout", function (e) {
          dustBoy.closePopup();
        });
      });
    },
    school_mark(data, map, pin) {
      let lat;
      let lon;
      let name;
      let type = "School";

      data.forEach((el) => {
        lat = el.lat;
        lon = el.lon;
        name = el.name;
        //set school pin on the map
        let point = L.icon({
          iconUrl: pin, //icon url
          iconSize: [35, 35], // size of the icon
        });
        //drop pin on the map
        let school_pin = L.marker([lat, lon], { icon: point }).addTo(map);
        //set popup
        school_pin.bindPopup(
          `
            <b>${type}</b><br>
            <b>Name:</b> ${name}<br><br>
            <a href='https://www.google.com/maps/dir/?api=1&origin=&destination=${lat},${lon}' >
                <button type='button' class='btn btn-success'>Navigatation</button>
            </a>
          `
        );

        //set mouse hover action
        school_pin.on("mouseover", function (e) {
          school_pin.openPopup();
        });
      });
    },
    private_mark(data, map, pin) {
      let lat;
      let lon;
      let name;
      let type = "Private";

      data.forEach((el) => {
        lat = el.lat;
        lon = el.lon;
        name = el.name;
        //set school pin on the map
        let point = L.icon({
          iconUrl: pin, //icon url
          iconSize: [35, 35], // size of the icon
        });
        //drop pin on the map
        let private_pin = L.marker([lat, lon], { icon: point }).addTo(map);
        //set popup
        private_pin.bindPopup(
          `
            <b>${type}</b><br>
            <b>Name:</b> ${name}<br><br>
            <a href='https://www.google.com/maps/dir/?api=1&origin=&destination=${lat},${lon}' >
              <button type='button' class='btn btn-success'>Navigatation</button>
            </a>
          `
        );

        //set mouse hover action
        private_pin.on("mouseover", function (e) {
          private_pin.openPopup();
        });
      });
    },
    hospital_mark(data, map, pin) {
      let lat;
      let lon;
      let name;
      let type = "Hospital";

      data.forEach((el) => {
        lat = el.lat;
        lon = el.lon;
        name = el.name;
        //set school pin on the map
        let point = L.icon({
          iconUrl: pin, //icon url
          iconSize: [35, 35], // size of the icon
        });
        //drop pin on the map
        let hospital_pin = L.marker([lat, lon], { icon: point }).addTo(map);
        //set popup
        hospital_pin.bindPopup(
          `
            <b>${type}</b><br>
            <b>Name:</b> ${name}<br><br>
            <a href='https://www.google.com/maps/dir/?api=1&origin=&destination=${lat},${lon}' >
              <button type='button' class='btn btn-success'>Navigatation</button>
            </a>
          `
        );

        //set mouse hover action
        hospital_pin.on("mouseover", function (e) {
          hospital_pin.openPopup();
        });
      });
    },
    userAdded_mark(_data, map, school_pin, private_pin, hospital_pin) {
      let lat;
      let lon;
      let name;
      let type;
      let data = [];
      for (let item in _data) {
        if (_data[item] != null) data.push(_data[item]);
      }

      data.forEach((el) => {
        let point;
        let lat = el.lat;
        let lon = el.lon;
        let name = el.name;
        let type = el.type;
        let sf_id = el.sf_id;

        if (type === "School") {
          point = L.icon({
            iconUrl: school_pin, //icon url
            iconSize: [35, 35], // size of the icon
          });
        } else if (type === "Private") {
          point = L.icon({
            iconUrl: private_pin, //icon url
            iconSize: [35, 35], // size of the icon
          });
        } else {
          point = L.icon({
            iconUrl: hospital_pin, //icon url
            iconSize: [35, 35], // size of the icon
          });
        }
        //drop pin on the map
        let pin = L.marker([lat, lon], { icon: point }).addTo(map);
        //set popup
        pin.bindPopup(
          `
            <b>${type}</b><br>
            <b>Name:</b> ${name}<br><br>
            <a href='safety-zone/${sf_id}'>
              <button type='button' class='btn btn-primary'>Info</button>
            </a>
            <a href='https://www.google.com/maps/dir/?api=1&origin=&destination=${lat},${lon}' >
              <button type='button' class='btn btn-success'>Navigatation</button>
            </a>
          `
        );

        //set mouse hover action
        pin.on("mouseover", function (e) {
          pin.openPopup();
        });
      });
    },

    async getLocation() {
      return new Promise(async (resolve, reject) => {
        var location = [];
        try {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async function (position) {
              await location.push(position.coords.latitude);
              await location.push(position.coords.longitude);

              resolve(location);
            });
          } else {
            reject(new Error("Geolocation is not supported by this browser."));
          }
        } catch (err) {
          reject(new Error(err));
        }
      });
    },
  },
  mounted() {
    let map;
    this.getLocation() //get locastion
      .then(async (location) => {
        //set map view
        map = await L.map("map").setView(location, 12); //set map
        //get map
        await L.marker(location).addTo(map);
        await L.tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 25,
            id: "mapbox/streets-v11",
            accessToken:
              "sk.eyJ1IjoicHBvb20iLCJhIjoiY2s1emtvN3QzMWZ3dzNrcnZwMDI1cHpwdSJ9.MD9eQUsDkHNVsY0mgXUGIA",
          }
        ).addTo(map);
      })
      .then(() => {
        //pin dust sensor
        axios
          .get(
            "https://safety-zone-c1ae5.firebaseio.com/basicSensorInfo/dustBoy.json"
          )
          .then(async (res) => {
            await this.dust_mark(res.data, map);
          });
      })
      .then(() => {
        //pin safety zone school
        axios
          .get(
            "https://safety-zone-c1ae5.firebaseio.com/safetyZone/school.json"
          )
          .then(async (res) => {
            await this.school_mark(res.data, map, this.school_pin);
          });
      })
      .then(() => {
        //pin hospital zone school
        axios
          .get(
            "https://safety-zone-c1ae5.firebaseio.com/safetyZone/hospital.json"
          )
          .then(async (res) => {
            await this.hospital_mark(res.data, map, this.hospital_pin);
          });
      })
      .then(() => {
        //pin private zone school
        axios
          .get(
            "https://safety-zone-c1ae5.firebaseio.com/safetyZone/private.json"
          )
          .then(async (res) => {
            await this.private_mark(res.data, map, this.private_pin);
          });
      })
      .then(() => {
        //pin user-added sensor
        axios
          .get(
            "https://safety-zone-c1ae5.firebaseio.com/safetyZone/userAdded.json"
          )
          .then(async (res) => {
            await this.userAdded_mark(
              res.data,
              map,
              this.school_pin,
              this.private_pin,
              this.hospital_pin
            );
          });
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style scoped>
#map {
  position: relative;
  top: 2.5vh;
  left: 1.5vw;
  background-color: #fff;
  width: 97vw;
  height: 83vh;
  border-radius: 5px;
}
</style>
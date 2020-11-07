<template>
  <b-container fluid="md" class="py-5" v-if="load">
    <h2 align="center">ADD NEW SAFETY ZONE</h2>
    <b-form @submit="onUpdate" v-if="show" class="py-5">
      <!-- safety zone name -->
      <b-form-group
        id="input-group-ower"
        label="Safety Zone Name:"
        label-for="input-ower"
      >
        <b-form-input
          id="input-ower"
          v-model="form.name"
          required
          placeholder="Enter safety zone name"
          :state="sf_validation"
        ></b-form-input>
        <b-form-invalid-feedback :state="sf_validation">
          Safety Zone name must not be blank
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="sf_validation"></b-form-valid-feedback>
      </b-form-group>

      <!-- owner name -->
      <b-form-group
        id="input-group-owner"
        label="Your Name:"
        label-for="input-owner"
      >
        <b-form-input
          id="input-owner"
          v-model="form.owner"
          required
          placeholder="Enter owner name"
          :state="owner_validation"
        ></b-form-input>
        <b-form-invalid-feedback :state="owner_validation">
          Your Name must not be blank
        </b-form-invalid-feedback>
        <b-form-valid-feedback
          :state="owner_validation"
        ></b-form-valid-feedback>
      </b-form-group>

      <!-- owner CID -->
      <b-form-group
        id="input-group-owerCID"
        label="Your Citizen ID:"
        label-for="input-owerCID"
      >
        <b-form-input
          id="input-owerCID"
          v-model="form.owner_CID"
          required
          placeholder="Enter owner citizen ID"
          :state="ownerCID_validation"
        ></b-form-input>
        <b-form-invalid-feedback :state="ownerCID_validation">
          Your Citizen ID must not be blank
        </b-form-invalid-feedback>
        <b-form-valid-feedback
          :state="ownerCID_validation"
        ></b-form-valid-feedback>
      </b-form-group>

      <!-- lat-lng -->
      <b-form-row id="input-group-latlng">
        <b-form-group
          id="input-group-lat"
          label="Latitude:"
          label-for="input-lat"
        >
          <b-form-input
            id="input-lat"
            v-model="form.lat"
            required
            placeholder="Enter latitude"
            :state="lat_validation"
          ></b-form-input>
          <b-form-invalid-feedback :state="lat_validation">
            Latitude must not be blank
          </b-form-invalid-feedback>
          <b-form-valid-feedback
            :state="lat_validation"
          ></b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-lng"
          label="Longitude:"
          label-for="input-lng"
        >
          <b-form-input
            id="input-lng"
            v-model="form.lon"
            required
            placeholder="Enter longitude"
            :state="lng_validation"
          ></b-form-input>
          <b-form-invalid-feedback :state="lng_validation">
            Longitude must not be blank
          </b-form-invalid-feedback>
          <b-form-valid-feedback
            :state="lng_validation"
          ></b-form-valid-feedback>
        </b-form-group>
      </b-form-row>
      <b-button variant="secondary" class="btn-latlng mb-3" @click="myPoint"
        >Get Your Point</b-button
      >

      <b-form-row id="input-group-air_con-row">
        <!-- air conditioner -->
        <b-form-group
          id="input-group-air_con"
          label="Air Conditioner:"
          label-for="input-air_con"
        >
          <b-form-input
            id="input-air_con"
            v-model="form.air_con"
            required
            placeholder="Enter number of air conditioner"
            type="number"
            min="0"
          ></b-form-input>
        </b-form-group>

        <!-- air purifier -->
        <b-form-group
          id="input-group-air_pur"
          label="Air Purifier:"
          label-for="input-air_pur"
        >
          <b-form-input
            id="input-air_pur"
            v-model="form.air_pur"
            required
            placeholder="Enter number of air purifier"
            type="number"
            min="0"
          ></b-form-input>
        </b-form-group>
      </b-form-row>

      <!-- overnight and room -->
      <b-form-checkbox id="overnight" v-model="form.overnight">
        Can stay overnight
      </b-form-checkbox>

      <b-form-group id="input-group-room" label="Room:" label-for="input-room">
        <b-form-input
          id="input-room"
          v-model="form.room"
          required
          placeholder="Enter number of room"
          type="number"
          min="0"
          :disabled="!form.overnight"
        ></b-form-input>
      </b-form-group>

      <!-- capacity -->
      <b-form-group
        id="input-group-capacity"
        label="Capacity of room:"
        label-for="input-capacity"
      >
        <b-form-input
          id="input-capacity"
          v-model="form.capacity_width"
          required
          placeholder="Enter width (m)"
          type="number"
        ></b-form-input>
        <b-form-input
          id="input-capacity"
          v-model="form.capacity_len"
          required
          placeholder="Enter length (m)"
          type="number"
        ></b-form-input>
        <b-form-input
          id="input-capacity"
          v-model="form.capacity_height"
          required
          placeholder="Enter height (m)"
          type="number"
        ></b-form-input>
      </b-form-group>

      <!-- type -->
      <b-form-group id="input-group-type" label="Type:" label-for="input-type">
        <b-form-select
          v-model="form.type"
          :options="type_options"
          required
        ></b-form-select>
      </b-form-group>

      <!-- address -->
      <b-form-group
        id="input-group-address"
        label="Address:"
        label-for="input-address"
        class="mt-4"
      >
        <b-form-textarea
          id="address"
          v-model="form.address"
          placeholder="Enter safety zone address"
          rows="4"
          :state="address_validation"
        ></b-form-textarea>
        <b-form-invalid-feedback :state="address_validation">
          Safety Zone Address must not be blank
        </b-form-invalid-feedback>
        <b-form-valid-feedback
          :state="address_validation"
        ></b-form-valid-feedback>
      </b-form-group>

      <!-- contact -->
      <label for="input-tel">Contact:</label>
      <!-- telephone number -->
      <b-form-input
        id="input-tel"
        v-model="form.tel"
        type="text"
        required
        placeholder="Enter telephone number"
        :state="tel_validation"
        class="mb-2"
      ></b-form-input>
      <b-form-invalid-feedback :state="tel_validation">
        Telephone Number must not be blank
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="tel_validation"></b-form-valid-feedback>

      <!-- email -->
      <b-form-input
        id="input-email"
        v-model="form.email"
        type="text"
        placeholder="Enter safety zone email"
        class="mb-2"
      ></b-form-input>

      <!-- line -->
      <b-form-input
        id="input-line"
        v-model="form.line"
        type="text"
        placeholder="Enter safety zone line"
        class="mb-2"
      ></b-form-input>

      <!-- facebook -->
      <b-form-input
        id="input-fb"
        v-model="form.facebook"
        type="text"
        placeholder="Enter safety zone facebook"
        class="mb-4"
      ></b-form-input>

      <div class="mb-4 mt-4">
        using image<br />
        <img id="cover_url" :src="data.cover_url" />
        <img id="inside1_url" :src="data.inside1_url" />
        <img id="inside2_url" :src="data.inside2_url" />
        <img id="inside3_url" :src="data.inside3_url" />
      </div>

      <!-- image preview -->
      <div class="img-upload-container mb-5">
        <b-card class="mb-4">
          <template v-slot:header>
            <h6 class="mb-0" align="left">Cover Image</h6>
          </template>
          <b-card-text>Choose image to show the front of place.</b-card-text>
          <b-row>
            <b-col lg="10">
              <b-form-file
                no-drop
                accept="image/jpeg, image/png"
                v-model="cover_img"
                ref="file-input"
                class="mb-2 img-upload"
                placeholder="Choose cover image"
                required
                @change="previewImg($event, 'cover')"
                :state="Boolean(cover_img)"
                id="cover_img"
              />
            </b-col>
            <b-col lg="2">
              <b-button
                @click="
                  (cover_img = null),
                    (form.cover_url = ''),
                    (document.getElementById('cover_img').required = true)
                "
                class="btn-reset mb-3"
                >Reset</b-button
              >
            </b-col>
          </b-row>

          <b-img :src="form.cover_url" id="cover-img"></b-img>
        </b-card>

        <b-card>
          <template v-slot:header>
            <h6 class="mb-0" align="left">Inside Images</h6>
          </template>
          <b-card-text>Choose images to give more infomation.</b-card-text>
          <b-row>
            <!-- img1 -->
            <b-col lg="10">
              <b-form-file
                no-drop
                accept="image/jpeg, image/png"
                v-model="inside_img1"
                ref="file-input"
                class="mb-2 img-upload"
                placeholder="Choose first inside image"
                required
                @change="previewImg($event, 'inside1')"
                :state="Boolean(inside_img1)"
                id="inside1_img"
              />
            </b-col>
            <b-col lg="2">
              <b-button
                @click="
                  (inside_img1 = null),
                    (form.inside2_url = ''),
                    (document.getElementById('inside1_img').required = true)
                "
                class="btn-reset mb-3"
                >Reset</b-button
              >
            </b-col>
          </b-row>

          <b-row>
            <!-- img2 -->
            <b-col lg="10">
              <b-form-file
                no-drop
                accept="image/jpeg, image/png"
                v-model="inside_img2"
                ref="file-input"
                class="mb-2 img-upload"
                placeholder="Choose second inside image"
                required
                @change="previewImg($event, 'inside2')"
                :state="Boolean(inside_img2)"
                id="inside2_img"
              />
            </b-col>
            <b-col lg="2">
              <b-button
                @click="
                  (inside_img2 = null),
                    (form.inside2_url = ''),
                    (document.getElementById('inside2_img').required = true)
                "
                class="btn-reset mb-3"
                >Reset</b-button
              >
            </b-col>
          </b-row>

          <b-row>
            <!-- img3 -->
            <b-col lg="10">
              <b-form-file
                accept="image/jpeg, image/png"
                v-model="inside_img3"
                ref="file-input"
                class="mb-2 img-upload"
                placeholder="Choose third inside image"
                required
                @change="previewImg($event, 'inside3')"
                :state="Boolean(inside_img3)"
                id="inside3_img"
              />
            </b-col>
            <b-col lg="2">
              <b-button
                @click="
                  (inside_img3 = null),
                    (form.inside3_url = ''),
                    (document.getElementById('inside3_img').required = true)
                "
                class="btn-reset mb-3"
                >Reset</b-button
              >
            </b-col>
          </b-row>

          <div id="inside-img">
            <b-row>
              <b-col md>
                <b-img :src="form.inside1_url" fluid class="mb-2"></b-img>
              </b-col>
              <b-col md>
                <b-img :src="form.inside2_url" fluid class="mb-2"></b-img>
              </b-col>
              <b-col md>
                <b-img :src="form.inside3_url" fluid class="mb-3"></b-img>
              </b-col>
            </b-row>
          </div>
        </b-card>
      </div>

      <b-button type="submit" variant="primary">Update</b-button>
      <b-button variant="danger" @click="$emit('cancel')">Cancel</b-button>
    </b-form>
  </b-container>
</template>

<script>
let uid = "";
import axios from "axios";

export default {
  layout: "nav-bar",

  props: ["data"],

  created() {
    for (let item in this.data) {
      this.form[item] = this.data[item];
    }
    this.load = true;

    this.$emit("editLoadFinished");
  },
  mounted() {
    document.getElementById("cover_img").required = false;
    document.getElementById("inside1_img").required = false;
    document.getElementById("inside2_img").required = false;
    document.getElementById("inside3_img").required = false;
  },

  data() {
    return {
      load: "false",
      form: {
        name: "",
        owner: "",
        owner_CID: "",
        owner_uid: "",
        address: "",
        lat: "",
        lon: "",
        tel: "",
        email: "",
        line: "",
        facebook: "",
        air_con: "",
        air_pur: "",
        overnight: false,
        room: "",
        capacity_width: "",
        capacity_len: "",
        capacity_height: "",
        type: "",
        cover_url: "",
        inside1_url: "",
        inside2_url: "",
        inside3_url: "",
        index_onSFOwner: "",
        index_onUserAdded: "",
      },

      cover_img: null,
      inside_img1: null,
      inside_img2: null,
      inside_img3: null,
      show: true,
      type_options: [
        { value: "", text: "Please select safety zone type", disabled: true },
        { value: "Hospital", text: "Hospital" },
        { value: "Private", text: "Private" },
        { value: "School", text: "School" },
      ],
    };
  },
  methods: {
    update_sf_info(sf_id) {
      this.$fireDb
        .ref(`safetyZone/sf_user_info/${sf_id}`)
        .set({
          name: this.form.name,
          owner: this.form.owner,
          owner_CID: this.form.owner_CID,
          address: this.form.address,
          lat: this.form.lat,
          lon: this.form.lon,
          tel: this.form.tel,
          email: this.form.email,
          line: this.form.line,
          facebook: this.form.facebook,
          air_con: this.form.air_con,
          air_pur: this.form.air_pur,
          overnight: this.form.overnight,
          room: this.form.room,
          type: this.form.type,
          capacity_width: this.form.capacity.width,
          capacity_len: this.form.capacity.len,
          capacity_height: this.form.capacity.height,
          cover_url: this.form.cover_url,
          inside1_url: this.form.inside1_url,
          inside2_url: this.form.inside2_url,
          inside3_url: this.form.inside3_url,
          index_onSFOwner: this.data.index_onSFOwner,
          index_onUserAdded: this.data.index_onUserAdded,
        })
        .then(() => {
          alert("data is updated!");
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async update_sf(index, sf_id) {
      const sf = this.$fireDb.ref(`safetyZone/userAdded/${index}`);

      await sf
        .set({
          sf_id: sf_id,
          name: this.form.name,
          type: this.form.type,
          lat: this.form.lat,
          lon: this.form.lon,
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async update_sf_owner(sf_id) {
      let u_id = this.$cookies.get("uid");
      let index = this.data.index_onSFOwner;

      const sf = this.$fireDb.ref(`sf_owner/${u_id}/${index}`);

      await sf
        .set({
          sf_id: sf_id,
          name: this.form.name,
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async onUpdate(evt) {
      evt.preventDefault();
      let sf_id = "sf_01";
      await this.update_sf_info(sf_id); //update sf info
      await this.update_sf_owner(sf_id); //update sf owner
      await this.update_sf(this.data.index_onUserAdded, sf_id); //update sf userAdded

      this.$emit("edited");
    },

    myPoint() {
      axios
        .post(
          "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCzLAmL9pLpThOZ4HzoU2JfY7hAmPbukYI"
        )
        .then((res) => {
          this.form.lat_lng.lat = res.data.location.lat;
          this.form.lat_lng.lng = res.data.location.lng;
        });
    },

    async previewImg(event, img) {
      const preview = event.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", async () => {
        if (img === "cover") {
          this.form.cover_url = reader.result;
        } else if (img === "inside1") {
          this.form.inside1_url = reader.result;
        } else if (img === "inside2") {
          this.form.inside2_url = reader.result;
        } else if (img === "inside3") {
          this.form.inside3_url = reader.result;
        }
      });

      await reader.readAsDataURL(preview);
    },
  },

  computed: {
    sf_validation() {
      this.sf_valid = true;
      return this.form.name != "";
    },
    owner_validation() {
      return this.form.owner != "";
    },
    ownerCID_validation() {
      return this.form.owner_CID != "";
    },
    lat_validation() {
      return this.form.lat != "";
    },
    lng_validation() {
      return this.form.lng != "";
    },
    address_validation() {
      return this.form.address != "";
    },
    tel_validation() {
      return this.form.tel != "";
    },
  },
};
</script>

<style scoped>
#address {
  resize: none;
}
#input-group-latlng {
  margin-left: 0.03125%;
  align-items: center;
}
#input-group-lat,
#input-group-lng,
#input-group-air_con,
#input-group-air_pur,
#input-group-room,
#input-group-capacity,
#input-group-type {
  width: 35%;
  margin-right: 5%;
}
.btn-latlng {
  margin-top: -0.75%;
}
#input-tel,
#input-email,
#input-line,
#input-fb {
  width: 70%;
  margin-right: 5%;
}
.img-upload-container {
  width: 85%;
  transform: translate(-50%, 0);
  margin-left: 50%;
}
.img-upload {
  width: 85%;
}
.btn-reset {
  width: 100%;
}
#cover-img {
  max-width: 20%;
  transform: translate(-50%, 0);
  margin-left: 50%;
}
#inside-img {
  transform: translate(-50%, 0);
  margin-left: 50%;
  width: 75%;
}
/* hide spinners on input type number*/
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
img {
  width: 22%;
}
@media only screen and (max-width: 541px) {
  img {
    width: 70%;
    margin-bottom: 5px;
  }
}
</style>
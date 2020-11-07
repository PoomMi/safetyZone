<template>
  <b-container fluid="md" class="py-5">
    <b-overlay :show="!load" no-wrap class="loading"> </b-overlay>

    <div id="content" v-if="data_exist">
      <div class="img-container mb-5">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="3000"
          controls
          indicators
          style="text-shadow: 1px 1px 2px #333"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide
            caption="Front of safety zone"
            :text="data.name"
            :img-src="data.cover_url"
          ></b-carousel-slide>

          <b-carousel-slide :img-src="data.inside1_url">
            <h5>{{ data.name }}</h5>
          </b-carousel-slide>

          <b-carousel-slide :img-src="data.inside2_url">
            <h5>{{ data.name }}</h5>
          </b-carousel-slide>

          <b-carousel-slide :img-src="data.inside3_url">
            <h5>{{ data.name }}</h5>
          </b-carousel-slide>
        </b-carousel>
      </div>

      <div id="name"><b>Name</b>: {{ data.name }}</div>
      <div id="type"><b>Type</b>: {{ data.type }}</div>
      <div id="owner"><b>Owner</b>: {{ data.owner }}</div>
      <div id="address"><b>Address</b>: {{ data.address }}</div>
      <div id="tel"><b>Tel.</b>: {{ data.tel }}</div>
      <div id="email"><b>Email</b>: {{ data.email }}</div>
      <div id="line"><b>Line</b>: {{ data.line }}</div>
      <div id="facebook"><b>Facebook</b>: {{ data.facebook }}</div>
      <div id="air_con"><b>Air condition</b>: {{ data.air_con }}</div>
      <div id="air_pur"><b>Air purifire</b>: {{ data.air_pur }}</div>
      <div id="overnight"><b>Overnight</b>: {{ data.overnight }}</div>
      <div id="room"><b>Room</b>: {{ data.room }}</div>
      <div id="capacity">
        <b>capacity</b>: {{ data.capacity_width }}m. x
        {{ data.capacity_len }}m. x {{ data.capacity_height }}m.
      </div>

      <rating />
    </div>
    <div v-if="!data_exist" class="no-data">
      No data
      <nuxt-link class="nav-link nav-item btn-back" to="/">
        <b-button block variant="primary">Back</b-button>
      </nuxt-link>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
import rating from "@/components/ratning-displayed";

export default {
  layout: "nav-bar",
  components: { rating },

  data() {
    return {
      load: "",
      data_exist: true,
      data: "",
      rating: "",
      sf_id: "",
      slide: 0,
      sliding: null,
    };
  },

  created() {
    this.sf_id = this.$route.params.id;
    this.load = false;

    this.$fireDb
      .ref(`safetyZone/sf_user_info/${this.sf_id}`)
      .once("value")
      .then((res) => {
        if (res.val() == null) this.data_exist = false;
        else {
          this.data = res.val();
        }
      })
      .then(async () => {
        this.load = true;
      });
  },

  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
}
.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: rgb(105, 104, 104);
  font-size: 3rem;
}
.img-container {
  width: 100%;
  background: rgb(156, 156, 156);
  overflow: hidden;
}
.space-box {
  float: right;
}
.loading {
  position: fixed !important;
}

@media only screen and (max-width: 541px) {
  img {
    width: 70%;
    margin-bottom: 5px;
  }
  .space-box {
    float: left;
    margin-right: 100%;
  }
}
</style>
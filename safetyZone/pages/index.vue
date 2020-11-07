<template>
  <div>
    <mymap class="mymap" />
    <b-icon
      icon="question-circle-fill"
      class="gildline"
      font-scale="1.5"
      v-b-tooltip.hover.bottom
      title="Click to view tootltip"
      @click="$refs['modal'].show()"
    ></b-icon>
    <center></center>
    <b-modal
      ref="modal"
      hide-footer
      title="Hover mouse on a stuff on the map for information"
    >
      <b-row class="my-3 d-flex align-items-center ml-2">
        <b-col cols="3" class="d-flex justify-content-center"
          ><img class="dust-sensor mx-1"
            src="https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2Fsensor%2Fgreen-point.png?alt=media&token=58bc70c6-de74-45a5-b406-8f0c33e80073"
          />
          <img class="dust-sensor mx-1"
            src="https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2Fsensor%2Forange-point.png?alt=media&token=446a1a4a-25a9-466c-bc0c-9ffec61b8083"
          />
          <img class="dust-sensor mx-1"
            src="https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2Fsensor%2Fyellow-point.png?alt=media&token=47609d47-ce10-455b-a2d1-5e4b46a1d0ba"
          />
          <img class="dust-sensor mx-1"
            src="https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2Fsensor%2Fred-point.png?alt=media&token=f8d62174-e75d-4974-ba6d-da3caf63db9d"
          />
        </b-col>
        <b-col>Dust sensor</b-col>
      </b-row>
      <b-row class="my-3 d-flex align-items-center ml-2">
        <b-col cols="3" class="d-flex justify-content-center"><img class="mypin" src="https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png" /></b-col>
        <b-col>Your loacation</b-col>
      </b-row>
      <b-row class="my-3 d-flex align-items-center ml-2">
        <b-col cols="3" class="d-flex justify-content-center"
          ><img class="sf-pin"
            src="https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2FsafetyZone%2Fschool_pin.png?alt=media&token=9a00b9e5-c699-4a2a-8c42-b249626c81b8"
        /></b-col>
        <b-col>Safety zone type school</b-col>
      </b-row>
      <b-row class="my-3 d-flex align-items-center ml-2">
        <b-col cols="3" class="d-flex justify-content-center"
          ><img class="sf-pin"
            src="https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2FsafetyZone%2Fhospital_pin.png?alt=media&token=6acb47db-d9aa-4f3d-aa94-1b2fdeaa9270"
        /></b-col>
        <b-col>Safety zone type hospital</b-col>
      </b-row>
      <b-row class="my-3 d-flex align-items-center ml-2">
        <b-col cols="3" class="d-flex justify-content-center"
          ><img class="sf-pin"
            src="https://firebasestorage.googleapis.com/v0/b/safety-zone-c1ae5.appspot.com/o/images%2FsafetyZone%2Fprivae_pin.png?alt=media&token=6e3b643a-d5a9-458a-bd94-0726dbd1053d"
        /></b-col>
        <b-col>Safety zone type private</b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import mymap from "@/components/mymap";

export default {
  layout: "nav-bar",
  data() {
    return {
      tooltip: false,
    };
  },
};
</script>

<style scoped>
.gildline {
  position: absolute;
  right: 2%;
  top: 15%;
  cursor: pointer;
  z-index: 10;
}
.mymap {
  position: relative;
  z-index: 1;
}
.mypin {
  width: 25%;
}
.sf-pin{
  width: 40%;
}
.dust-sensor{
  width:22%;
}
.modal-content{
  width: 35vw;
}
</style>
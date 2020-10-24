// src/plugins/vue-leaflet.js
import Vue from 'vue'

import { LMap, LMarker } from 'vue2-leaflet';
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const VueLeaflet = {

  install(Vue, options) {
    Vue.component('l-map', LMap)
    Vue.component('l-marker', LMarker)
  }

};

Vue.use(VueLeaflet);

export default VueLeaflet;
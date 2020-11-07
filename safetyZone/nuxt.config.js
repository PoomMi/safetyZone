
export default {
  server: {
    port: 3000, // default: 3000     
    host: '0.0.0.0' // default: localhost   
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/vue-leaflet', ssr: false },
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    ['bootstrap-vue/nuxt', { icons: true }], // Doc: https://bootstrap-vue.js.org
    ['cookie-universal-nuxt'], //cookie 
    ['@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyD9b-CAfy2cfYlFs1Pvzm4vS5U7leRHRKs",
          authDomain: "safety-zone-c1ae5.firebaseapp.com",
          databaseURL: "https://safety-zone-c1ae5.firebaseio.com",
          projectId: "safety-zone-c1ae5",
          storageBucket: "safety-zone-c1ae5.appspot.com",
          messagingSenderId: "809799248278",
          appId: "1:809799248278:web:7311a5af3bd73690edd5b7",
          measurementId: "G-G27CMZLVH0"
        },
        services: {
          auth: true,
          realtimeDb: true
        }
      }
    ]
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  env: {
    baseUrl: process.env.BASE_URL
  }
}

<template>
  <b-container fluid="md" class="py-5" v-if="load">
    <div id="content"  v-if="data_exist">
      <spaceBox class="space-box"/>
      <div id="name"></div>
      <div id="type"></div>
      <div id="owner"></div>
      <div id="address"></div>
      <div id="tel"></div>
      <div id="email"></div>
      <div id="line"></div>
      <div id="facebook"></div>
      <div id="air_con"></div>
      <div id="air_pur"></div>
      <div id="overnight"></div>
      <div id="room"></div>     
      <img id="cover_url"  src=""/> 
      <img id="inside1_url"  src=""/> 
      <img id="inside2_url"  src=""/> 
      <img id="inside3_url"  src=""/> 
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

  import axios from 'axios'
  import spaceBox from '@/components/sf-available'

  export default {
    layout: 'nav-bar',

    components: { spaceBox },
      
    data(){
      return{
        load: false,
        data_exist: true,
      }
    },

		mounted(){
			if( this.$cookies.get('uid')==null ){
				alert('Invalid access!, try to login.')
				window.location = "/"
			}else{
        let sf_id = this.$route.params.id
        this.load = true 
          
        this.$fireDb.ref(`safetyZone/sf_user_info/${sf_id}`).once('value').then( res=>{
          if(res.val()==null) this.data_exist = false
          else{
            let obj = Object.keys(res.val())
            obj.forEach( el=> {
              if( el === "cover_url" || el === "inside1_url" 
              || el === "inside2_url"|| el === "inside3_url"){
                document.getElementById(el).src = res.val()[el]
              }else if(el != "owner_CID" && el != "lat" && el != "lon" && el != "capacity"){
                let key = el.charAt(0).toUpperCase() + el.slice(1) //make first letter become capital 
                document.getElementById(el).innerHTML = `<b>${key}</b>: ${res.val()[el]}<br>` 
              }             
            });
          }
        })
        
			}
		}
  }
</script>

<style scoped>
	.title{
    font-weight: bold;
  }
  .no-data{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: rgb(105, 104, 104);
    font-size: 3rem;
  }
  img{
    width: 22%;
  }
  .space-box{
    float: right;
  }
  @media only screen and (max-width: 541px) {
    img{
      width: 70%;
      margin-bottom: 5px;
    }
    .space-box{
      float: left;
      margin-right: 100%;
    }
}
</style>
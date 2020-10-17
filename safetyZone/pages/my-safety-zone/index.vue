<template>
  <b-container fluid="md" class="py-5" v-if="load">
      <b-card header-tag="header" class="shadow">      
        <template v-slot:header>
          <b-row>
            <b-col>
              <div class="mb-0 card-title">My Safety Zone</div>
            </b-col>
            <b-col>
              <nuxt-link class="nav-link nav-item" to="/safety-zone-registeration">
                <b-icon icon="plus-circle-fill" class="float-right rounded-circle sf_add text-primary" 
                font-scale="2" v-b-tooltip.hover.bottom title="Add safet zone"></b-icon>
              </nuxt-link>
            </b-col>
          </b-row>        
        </template>
        
        <div class="content">
          <b-row class="mt-2 ml-1">
            <b-col cols="4" class="sf-title">ID</b-col>
            <b-col class="sf-title">Name</b-col>
          </b-row>
        </div>
      </b-card>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'nav-bar',

  data(){
    return{
      load: false
    }
  },

  mounted() {
    if( this.$cookies.get('uid')==null ){
			alert('Invalid access!, try to login.')
			window.location = "/"
    }else{
      this.load = true 
    }
    
    this.$fireDb.ref(`sf_owner/${this.$cookies.get('uid')}`).once('value').then( res=> {    
      if(res.val()!=null){
        const content = document.getElementsByClassName('content')[0]
        res.val().forEach(el => {
          content.innerHTML += 
            `
              <a href="/my-safety-zone/${el.sf_id}" title="${el.sf_name} 
              class="nav-link nav-item map nuxt-link-active">
                <div class="row ml-1 mt-2">
                  <div class="col-4 sf_content">${el.sf_id}</div>
                  <div class="col">${el.name}</div>
                </div>
                <hr>
              </a>
            `
        })
      }
    })
  }
}
</script>

<style>
  .card-body{
    max-height: 60vh;
    height: 60vh;
    overflow: auto;
  }
  /* scrollbar */
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
    background-color: #F5F5F5;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #F5F5F5;
    border-radius: 10px;
  }  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #82B1FF;
  }
  .sf_content{
    text-overflow: ellipsis; 
  }
  .sf_add{
    display: inline;
    cursor: pointer;
  }
  .sf_add:hover{
    transform: scale(1.1);
  }
  .card-title{
    font-size: 1.5rem;
  }
  .sf-title{
    font-weight: bolder;
  }
  a:link {
  text-decoration: none;
  }
  a:hover{
    text-decoration: none;
  }
  hr{
    width: 98%;
    margin-left: 1.5%;
    margin-top: 1.5%;
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>

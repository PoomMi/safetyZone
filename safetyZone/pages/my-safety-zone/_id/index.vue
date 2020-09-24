<template>
    <div v-if="load">
      my sf detail
    </div>
</template>

<script>
export default {
  layout: 'nav-bar',

  mounted(){
		if( this.$cookies.get('uid')==null ){
			alert('Invalid access!, try to login.')
		  window.location = "/"
		}else{
			this.load = true 
		}
  },
  
  data(){
    return{
      load: false
    }
  }
}
</script>
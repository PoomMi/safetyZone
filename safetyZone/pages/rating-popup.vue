<template>
	<b-container fluid="md" class="py-3">
		<div id="warpper" @click="warpperTricker"></div>
		<b-button variant="outline-primary" class="mb-4 btn" @click="formTrigger">Rating</b-button>
		<b-card
	        header="SAFETY ZONE RATING"
	        header-bg-variant="dark"
	        header-text-variant="white"
	        header-align="center"
	        id="rating-form" 
      	>
			<rating />
		</b-card>
	</b-container>
</template>

<script>
	import rating from '@/components/rating-form'

	export default{
		layout: 'nav-bar',

		components: {
			rating
		},

		methods: {
			formTrigger(){
				let ratingForm = document.getElementById('rating-form')
				let warpper = document.getElementById('warpper')
				if(ratingForm.style.display=="") {
					ratingForm.style.display="block"
					warpper.style.display="block"
				}
				else if(ratingForm.style.display=="block"){
					ratingForm.style.display=""
				}
			},
			warpperTricker(){
				let ratingForm = document.getElementById('rating-form')
				let warpper = document.getElementById('warpper')

				ratingForm.style.display="";
				warpper.style.display="";
			}
		}
	}
</script>

<style>
	#rating-form{
		display: none;
		z-index: 10;
	}
	.card-header:first-child {
	    text-align: center;
	}
	#warpper{
		position: absolute;
		background-color: #070101;
		opacity: 0.6;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 5;
		display: none;
	}
</style>
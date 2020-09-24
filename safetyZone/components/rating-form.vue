<template>
	<div>
	    <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="pb-5">
            <div v-for="(value, name) in form.rating" :key="(value, name)">
                <label>{{name}}</label>
                <b-input-group class="mb-3">
                <b-input-group-prepend>
                    <b-button @click=" form.rating[name] = 0">Clear</b-button>
                </b-input-group-prepend>
                <b-form-rating v-model="form.rating[name]" :variant="color[name]"></b-form-rating>
                <b-input-group-append>
                    <b-input-group-text class="justify-content-center" style="min-width: 3em;">
                    {{ value }}
                    </b-input-group-text>
                </b-input-group-append>
                </b-input-group>
            </div>

            <b-form-group id="input-group-comment" label="Comment:" 
            label-for="comment" class="mt-4">
                <b-form-textarea
                    id="comment"
                    v-model="form.comment"
                    placeholder="Enter your comment"
                    rows="4"
                ></b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="primary" class="float-right mt-2">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
	export default{

		data(){
			return{
				form: {
					comment: '',

					rating: {
			        	Cleaning: 0,
				        Visit: 0,
				        Security: 0	
					}
	        	},

	        	color: {
	        		Cleaning: 'warning',
	        		Visit: 'success',
	        		Security: 'primary'
	        	},

                sf_id: 'sf_01',
	        	show: true
	    	}        
		},

	    
	    methods: {
	      onSubmit(evt) {
	        evt.preventDefault()

	        this.$fireDb.ref(`rating/${this.sf_id}`).set({
                Cleaning: this.form.rating.Cleaning,
                Visit: this.form.rating.Visit,
                Security: this.form.rating.Security,
                Comment: this.form.comment
            })
	        .then( ()=> {
	        	alert(`${this.sf_id} is rated!`);
            })

	      },
	      onReset(evt) {
	        evt.preventDefault()
	        // Reset our form values
	        this.form.cleaning = 0
	        this.form.visited = 0	        
	        this.form.security = 0
	        // Trick to reset/clear native browser form validation state
	        this.show = false
	        this.$nextTick(() => {
	          this.show = true
	        })
	      }
	    }
	}
</script>

<style scoped>
	#btn-submit{
		float: right;
	}
	#comment{
		resize: none;
	}
</style>
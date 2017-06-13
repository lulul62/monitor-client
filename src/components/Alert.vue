  <template>
	  <div id="alert" class="alert alert-dismissible fade show" :class="[type]" data-dismiss="alert" role="alert">
	    {{ msg }}
	  </div>
  </template>
  <script>
  	export default {
  		props: ['type','msg']
	}
  </script>
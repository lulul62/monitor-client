  <template>
	  <div id="alert" class="alert alert-danger alert-dismissible fade show" data-dismiss="alert" role="alert">
	    <strong>Oh snap!</strong> Change a few things up and try submitting again.
	  </div>
  </template>
  <script>
  	export default {
  		props: ['type','msg']
	}
  </script>
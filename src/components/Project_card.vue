<template>
<div class="col-sm-4 mb-5">
        <div class="card">
          <div class="card-block">
            <h4 class="card-title"> {{ projet.titre }} </h4>
            <h6 class="card-subtitle text-muted"> {{ projet.client }} </h6>
            <div class="input-group mt-4 mb-3">
              <span class="input-group-btn">
                <button class="btn btn-secondary" type="button">+</button>
              </span>
              <input type="text" class="form-control" placeholder="Nouvelle Tâche"/>
            </div>

            <div class="form-check">
              <span> 
                Tâche 1 <span class="badge badge-success"> Actif </span>
              </span>
              <button type="button" class="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target="#Annotation">
                <i class="fa fa-pencil"></i> 
              </button>
              <small>
                <p class="text-muted">
                  Annotation 
                  <i class="fa fa-times"></i>
                </p>
              </small>
            </div>

            <div class="form-check">
              <span> 
                Tâche 2 <span class="badge badge-success"> Actif </span>
              </span>
              <button type="button" class="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target="#Annotation">
                <i class="fa fa-pencil"></i> 
              </button>
            </div>

            <a href="#" class="card-link"> Toutes les tâches... </a>
          </div>

          <div class="card-footer text-center">
            <a href="#" class="card-link" @click="updateModal" data-toggle="modal" data-target="#Edit">Editer</a>
          </div>
        </div>
      </div>
</div>
</template>
<script>
export default {
  name: 'app',
  props: ['projet'],
  data () {
    return {
      
    }
  },
  methods: {
    updateModal(){
      this.$emit('updateModal',this.projet);
    }
  }
}
</script>
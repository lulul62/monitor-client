<template>
<div class="col-sm-4">
        <div class="card">
          <div class="card-block">
            <h4 class="card-title">{{projet.title}}</h4>
            <h6 class="card-subtitle text-muted">Client</h6>
            <div class="input-group mt-4 mb-3">
              <span class="input-group-btn">
                <button class="btn btn-secondary" type="button">+</button>
              </span>
              <input type="text" class="form-control" placeholder="Nouvelle Tâche"/>
            </div>
            <div class="form-check " v-for="tache in projet.taches">
              <span> 
              {{tache.tache}}<span class="badge badge-success"> Actif </span>
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
              <span> 
              Tâche 2<span class="badge badge-success"> Actif </span>
              </span>
              <button type="button" class="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target="#Annotation">
                <i class="fa fa-pencil"></i> 
              </button>
            </div>

            <a href="#" class="card-link"> Toutes les tâches... </a>
          </div>

          <div class="card-footer text-center">
            <a href="#" class="card-link" data-toggle="modal" data-target="#Edit">Editer</a>
          </div>
        </div>
      </div>
</div>
</template>
<script>
export default {
  name: 'app',
  props: ["projet"],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
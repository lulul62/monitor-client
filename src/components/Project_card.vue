<template>
<div class="col-sm-4 mb-5">
        <div class="card">
          <div class="card-block">
            <h4 class="card-title"> {{ projet.titre }} </h4>
            <h6 class="card-subtitle text-muted"> {{ projet.client }} </h6>
            <div class="input-group mt-4 mb-3">
              <span class="input-group-btn">
                <button class="btn btn-secondary" type="button" @click = "add">+</button>
              </span>
              <input v-model="newtask" type="text" class="form-control" placeholder="Nouvelle Tâche"/>
            </div>
            <div class ="form-check " v-for="tache in projet.taches">
            <span v-if = "tache == show">
            <input v-model = "tache.tache">
            <button type="button" class="fa fa-check" @click = "edit"></button>
            </span>
              <span v-else> 
              {{tache.nom}}<span class="badge badge-success"> Actif </span>
              <button type="button" class="btn btn-outline-secondary btn-sm" @click = "edit(tache)">
                <i class="fa fa-pencil"></i> 
              </button>
              </span>
              <small>
                <p class="text-muted">
                  Annotation 
                  <i class="fa fa-times"></i>
                </p>
              </small>
            </div>
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
  props: ['projet','index'],
  data () {
    return {
      show: false,
      newtask: "",
    }
  },
  methods: {
    edit(tache){
      this.show = tache;
    },
    updateModal(){
      this.$emit('updateModal',this.projet,this.index);
    },
    add(){
      this.$emit('addtask',this.newtask,this.index);
    }
  }
}
</script>
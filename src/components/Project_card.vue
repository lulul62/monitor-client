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
            <div v-if="showTasks"> 
                <div class ="form-check " v-for="tache in AllTasks">
                <span v-if = "tache == show">
                <input class="form-control" v-model = "tache.nom">
                <button type="button" class="fa fa-check" @click = "edittask(tache.id)"></button>
                <button type="button" class="fa fa-times" @click = "deletetask(tache.id)"></button>
                </span>
                 <span v-else> 
                  {{ tache.nom }}<span class="badge badge-success"> Actif </span>
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
            <div v-else class ="form-check " v-for="tache, index in projet.taches">
              <span v-if = "tache == show">
              <input v-model = "tache.nom">
              <button type="button" class="fa fa-check" @click = "edittask(index)"></button>
              <button type="button" class="fa fa-times" @click = "deletetask(index)"></button>
              </span>
                <span v-else> 
                {{ tache.nom }}<span class="badge badge-success"> Actif </span>
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

            <a href="#" @click="changeShowTask" class="card-link"> Toutes les tâches... </a>
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
      AllTasks: [],
      showTasks: true
    }
  },
  created: function(){
    this.getTaches();
    this.$on('added-task', () => {
      console.log("heard");
    })
  },
  methods: {
    changeShowTask(){
      this.showTasks = !this.showTasks;
    },
    edit(tache){
      this.show = tache;
    },
    updateModal(){
      this.$emit('updateModal',this.projet,this.index);
    },
    add(){
      this.$emit('addtask',this.newtask,this.index);
    },
    edittask(tache){
     this.$emit('edittask',this.show,this.index,tache);
     this.show = false;
    },
    deletetask(tache){
      this.$emit('deletetask',tache,this.index);
      this.show = false;
    },
    getTaches(){
      var that = this;
      this.$http.get("https://monitor-client-bda09.firebaseio.com/projets/"+ this.index +"/taches.json").then(response=>{
        this.AllTasks = [];
        jQuery.each(response.body, function(i,val) {
          let tempoTask = {
            nom: val.nom,
            etat: val.etat,
            id: i 
          };
          that.AllTasks.push(tempoTask);
          that.AllTasks = that.AllTasks.splice(0,2);
          console.log(that.AllTasks);
        });
      }, response=>{
        if(response.status == 404){
          this.makeAlert('alert-danger','Erreur 404, impossible de se connecter a la base de donnée');
        }
        if(response.status == 500){
          this.makeAlert('alert-danger','Erreur interne lors de la recuperation des projets dans la base de donnée');
        }
      })
    }
  },
  watch: {
    projet: function(){
      this.getTaches();
    }
  }
}
</script>
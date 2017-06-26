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
                  <form class="form-inline">
                    <input class="form-control col-sm-5 mr-4" v-model = "tache.nom">
                    <select class="form-control col-sm-5" v-model = "tache.etat" value>
                      <option value="Terminé"> Terminé </option>
                      <option value="Actif"> Actif </option>
                      <option value="En recette"> En recette </option>
                    </select>
                    <input class="form-control col-sm-11 mt-2" placeholder="Annotation" value="tache.annotation" v-model="tache.annotation">
                    <div class="offset-sm-4 mt-2 mb-2">
                      <button class="btn btn-outline-success btn-sm" @click = "edittask(tache.id)"><i class="fa fa-check"></i></button>
                      <button class="btn btn-outline-danger btn-sm" @click = "deletetask(tache.id)"><i class="fa fa-times"></i></button>
                    </div>
                  </form>
                </span>
                 <span v-else> 
                  {{ tache.nom }}<span class="badge badge-success"> {{ tache.etat }} </span>
                  <button type="button" class="btn btn-outline-secondary btn-sm" @click = "edit(tache)">
                    <i class="fa fa-pencil"></i> 
                  </button>
                  <small>
                    <p v-if="tache.annotation" class="text-muted">
                      {{ tache.annotation }}
                    </p>
                  </small>
                  </span>
              </div>
            </div>
            <div v-else class ="form-check " v-for="tache, index in projet.taches">
              <span v-if = "tache == show">
                 <form class="form-inline">
                    <input class="form-control col-sm-5 mr-4" v-model = "tache.nom">
                    <select class="form-control col-sm-5" v-model="tache.etat">
                      <option> Terminé </option>
                      <option> Actif </option>
                      <option> En recette </option>
                    </select>
                    <input class="form-control col-sm-11 mt-2" value="tache.annotation" v-model="tache.annotation">
                    <div class="offset-sm-4 mt-2 mb-2">
                      <button class="btn btn-outline-success btn-sm" @click = "edittask(index)"><i class="fa fa-check"></i></button>
                      <button class="btn btn-outline-danger btn-sm" @click = "deletetask(index)"><i class="fa fa-times"></i></button>
                    </div>
                  </form>
              </span>
                <span v-else> 
                {{ tache.nom }} <span class="badge badge-success"> {{ tache.etat }} </span>
                <button type="button" class="btn btn-outline-secondary btn-sm" @click = "edit(tache)">
                  <i class="fa fa-pencil"></i> 
                </button>
                </span>
                <small>
                  <p v-if="tache.annotation" class="text-muted">
                    {{ tache.annotation }}
                  </p>
                </small>
            </div>
            </div>

            <a @click.prevent="changeShowTask" href="#" v-if="tachesLength && showTasks" class="card-link text-center"> Tout afficher ({{tachesLength-2}} tâches de plus) </a>
            <a @click.prevent="changeShowTask" href="#" v-else-if="tachesLength" class="card-link text-center"> Retracter </a>
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
      showTasks: true,
      tachesLength: false
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
      this.newtask = "";
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
            annotation: val.annotation,
            id: i 
          };
          that.AllTasks.push(tempoTask);
        });
        if(this.AllTasks.length > 2){
          this.tachesLength = this.AllTasks.length;
        }else{
          this.tachesLength = false;
        }
        this.AllTasks = this.AllTasks.splice(0,2);
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
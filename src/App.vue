<template>
  <div id="app">
    <nav class="navbar navbar-toggleable-xl navbar-inverse bg-inverse">
 <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
 </button>
<!-- Links -->
<a class="navbar-brand" href="">MONITOR</a>
<div class="collapse navbar-collapse justify-content-end" id="nav-content">   
  <ul class="navbar-nav">
  <li class="nav-item">
  <a class="nav-link" href="" data-toggle="modal" data-target="#signin">Se connecter</a>
  </li>
  <li class="nav-item">
  <a class="nav-link" href="" data-toggle="modal" data-target="#addproject">Nouveau projet</a>
  </li>
  </ul>
</div>
</nav>
 <div class="container">
  <div class="jumbotron">
    <div class="row">
      <app-card v-for="projet, index in projets" :projet="projet" :index="index" @updateModal="updateModal"></app-card>
    </div>
   </div>
  </div> <!-- /container -->

<!-- modals -->

<div class="modal fade" id="Annotation" tabindex="-1" role="dialog" aria-labelledby="Edit" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="myModalLabel">Editer une tâche</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="inputNom" class="sr-only">Titre</label>
            <input id="inputNom" type="text" class="form-control" placeholder="Nom de tâche"/>
          </div>
          <div class="form-group">
            <label for="inputAnnot" class="sr-only">Client</label>
            <input id="inputAnnot" type="text" class="form-control" placeholder="Ajouter/Modifier l'annotation"/>
          </div>
          <div class="form-group">
            <label for="inputEtat" class="sr-only">Etat de la tâche</label>
            <select id="inputEtat" class="form-control">
              <option value=" " >Etat de la tâche</option>
              <option> Actif </option>
              <option> En recette </option>
              <option> Terminé </option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
          <button type="button" class="btn btn-danger">Supprimer</button>
          <button type="button" class="btn btn-primary">Ajouter</button>
        </div>
      </div>
    </div>
  </div>

<div class="modal fade" id="Edit" tabindex="-1" role="dialog" aria-labelledby="Edit" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="myModalLabel">Editer le projet</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="inputTitre" class="sr-only">Titre</label>
            <input id="inputTitre" type="text" class="form-control" v-model="updatingProjet.titre" :placeholder="modalContent.titre"/>
          </div>
          <div class="form-group">
            <label for="inputClient" class="sr-only">Client</label>
            <input id="inputClient" type="text" class="form-control" v-model="updatingProjet.client" :placeholder="modalContent.client"/>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
          <button type="button" @click="deleteProjet(modalContent)" class="btn btn-danger">Supprimer</button>
          <button type="button" @click="updateProjet()" class="btn btn-primary">Editer</button>
        </div>
      </div>
    </div>
  </div>

<div class="modal fade" id="addproject" tabindex="-1" role="dialog" aria-labelledby="addproject" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="myModalLabel">Ajouter un nouveau projet</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="inputTitre" class="sr-only">Titre</label>
            <input id="inputTitre" type="text" class="form-control" placeholder="Titre" v-model="projet.titre"/>
          </div>
          <div class="form-group">
            <label for="inputClient" class="sr-only">Client</label>
            <input id="inputClient" type="text" class="form-control" placeholder="Client" v-model="projet.client"/>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
          <button type="button" @click="newProject" class="btn btn-primary">Ajouter</button>
        </div>
      </div>
    </div>
  </div>

 <div class="modal fade" id="signin" tabindex="-1" role="dialog" aria-labelledby="#signin" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="form-signin-heading">Veuillez vous connecter</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="inputEmail" class="sr-only">Identifiant</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Identifiant" required autofocus>
          </div>
          <div class="form-group">
            <label for="inputPassword" class="sr-only">Mot de passe</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Mot de passe" required>
          </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Se souvenir de moi
          </label>
        </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-lg btn-primary btn-block" type="submit">Connexion</button>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'app',

  data () {
    return {
      projet: {},
      projets: [],
      modalContent: {},
      updatingProjet: {},
      baseApiUrl: "https://monitor-client-bda09.firebaseio.com/projets",
    }
  },

  created() {
    this.getProjets();
  },

  methods: {
    newProject(){
      if(!this.projet.titre || !this.projet.client){
        console.log("Pas ok");
      }else{
        let nouveauProjet = {
          titre: this.projet.titre,
          client: this.projet.client
        }
      }
      $('#addproject').modal('hide');
    },

    updateModal(projet,index){
      this.modalContent = projet;
      this.modalContent.id = index;
    },

    deleteProjet(projet){
      this.projets.splice(this.projets.indexOf(projet),1);
      $('#Edit').modal('hide');
    },

    getProjets(){
      this.$http.get(this.baseApiUrl+".json").then(response=>{
        this.projets = response.body;
        console.log(Object.keys(this.projets));
      }, response=>{
        console.log('error');
      })
    },

    updateProjet(){
      this.$http.put(this.baseApiUrl+"/"+this.modalContent.id+".json", {
        titre: this.updatingProjet.titre,
        client: this.updatingProjet.client
      }).then( (response) => {
        this.projets[this.modalContent.id] = response.body;
      }, (response) => {
        console.log('erreur',response)
      })
      $('#Edit').modal('hide');
      this.updatingProjet = {};
    }
  }

}
</script>

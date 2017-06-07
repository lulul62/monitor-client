import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import Project_card from './components/Project_card.vue'


Vue.use(VueResource);
Vue.component('app-card', Project_card);

new Vue({
  el: '#app',
  render: h => h(App)
})

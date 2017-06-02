import Vue from 'vue'
import App from './App.vue'
import Project_card from './components/Project_card.vue'

Vue.component('app-card', Project_card);

new Vue({
  el: '#app',
  render: h => h(App)
})

import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import Project_card from './components/Project_card.vue';
import Alert from './components/Alert.vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.use(VueResource);
Vue.component('app-card', Project_card);
Vue.component('alert', Alert);

new Vue({
  el: '#app',
  render: h => h(App)
})

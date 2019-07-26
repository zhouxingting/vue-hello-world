import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './icons';
import Icon from '@/components/svgIcon/svgIcon'; // svg组件

Vue.config.productionTip = false;

Vue.component('icon', Icon);

new Vue({
  router,
  store,
  render: h => h(App),
})
  .$mount('#app');

import Vue from 'vue'
import App from './App.vue'
import router from './router/manage'
import store from './store/manage'
import Http from './plugins/http';
import Cache from './plugins/cache';
import ViewUI from 'view-design';
import './assets/app.css';
// import 'view-design/dist/styles/iview.css';

Vue.use(Http);
Vue.use(Cache);
Vue.use(ViewUI);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Http from './plugins/http';
import Cache from './plugins/cache';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './assets/app.css';

Vue.use(Http);
Vue.use(Cache);
Vue.use(ViewUI);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

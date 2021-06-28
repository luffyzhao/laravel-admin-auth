import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Http from './plugins/http';
import Cache from './plugins/cache'
import ViewUI from 'view-design';
import './assets/app.css';

const modules = document.head.querySelector("[property~='og:modules'][content]").content || null;

Vue.config.productionTip = false;
Vue.use(Http, {baseURL: `/${modules}/`});
Vue.use(Cache);
Vue.use(ViewUI);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

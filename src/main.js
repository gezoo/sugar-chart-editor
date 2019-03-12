import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import router from './router';
import ChartUserComponent from './user_components';

Vue.use(ElementUI);
Vue.use(ChartUserComponent);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

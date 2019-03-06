import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'

Vue.config.productionTip = false

const uid = Cookies.get('uid');
if (uid) {
  store.commit('setUid', uid);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

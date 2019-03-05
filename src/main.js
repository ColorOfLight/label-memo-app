import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBz6nbUElbP-SKOaqnpWwEqrc2uDyPM4HU",
  authDomain: "label-memo-app.firebaseapp.com",
  databaseURL: "https://label-memo-app.firebaseio.com",
  // storageBucket: "<BUCKET>.appspot.com",
};
firebase.initializeApp(config);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

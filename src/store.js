import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import firebase from 'firebase'
require("firebase/firestore");

var config = {
  apiKey: "***REMOVED***",
  authDomain: "label-memo-app.firebaseapp.com",
  projectId: "label-memo-app",
  databaseURL: "https://label-memo-app.firebaseio.com",
  // storageBucket: "<BUCKET>.appspot.com",
};
firebase.initializeApp(config);

const db = firebase.firestore();

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    labels: {},
    memos: {},
    selectedLabel: '',
    selectedMemo: '',
    uid: '',
  },
  getters: {
    selectedMemos: state => {
      const sL = state.selectedLabel;
      const memoList = state.labels[sL] && state.labels[sL].memos;
      return memoList.map(item => state.memos[item]);
    },
  },
  mutations: {
    setUid: (state, pl) => {
      state.uid = pl;
    }
  },
  actions: {
    // TODO: error messages in signup & login
    signUp: ({state, commit}, {email, password}) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
          commit('setUid', firebase.auth().currentUser.uid);
          db.collection("users").add({ uid: state.uid });
          router.push({
            name: 'home'
          });
        }).catch((err) => {
          console.log(err);
          alert("회원 가입 중 문제가 발생했습니다. 개발자에게 문의해주세요!");
      });
    },
    login: ({state, commit}, {email, password}) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        commit('setUid', firebase.auth().currentUser.uid);
        router.push({ name: 'home' });
      }).catch((err) => {
        console.log(err);
        alert("로그인 중 문제가 발생했습니다. 개발자에게 문의해주세요!");
      });
    },
    initData: ({state, commit}) => {
      db.collection("labels").doc(state.uid).get().then((ss) => {
        if (doc.exists) {
          state.labels = ss.data;
        }
      });
      db.collection("memos").doc(state.uid).get().then((ss) => {
        if (doc.exists) {
          state.memos = ss.data;
        }
      });
    },
  }
})

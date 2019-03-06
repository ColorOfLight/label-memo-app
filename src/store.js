import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import Cookies from 'js-cookie'

import firebase from 'firebase'
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyBz6nbUElbP-SKOaqnpWwEqrc2uDyPM4HU",
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
    dbRef: null,
  },
  getters: {
    selectedMemos: state => {
      const sL = state.selectedLabel;
      const memoList = state.labels[sL] && state.labels[sL].memos;
      return memoList && memoList.map(item => state.memos[item]);
    },
  },
  mutations: {
    setUid: (state, uid) => {
      state.uid = uid;
      Cookies.set('uid', uid, {expires: 7});
    },
    setLabels: (state, data) => {
      state.labels = data;
    }
  },
  actions: {
    // TODO: error messages in signup & login
    signUp: ({state, commit, dispatch}, {email, password}) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
          commit('setUid', firebase.auth().currentUser.uid);
          db.collection("users").add({ uid: state.uid });
          dispatch('initData');
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
        dispatch('initData');
        router.push({ name: 'home' });
      }).catch((err) => {
        console.log(err);
        alert("로그인 중 문제가 발생했습니다. 개발자에게 문의해주세요!");
      });
    },
    initData: ({state, commit}) => {
      if (!state.uid) return;

      state.dbRef = db.collection("users").doc(state.uid);

      state.dbRef.collection("labels").onSnapshot((res) => {
        let newLabels = {}
        res.forEach(item => {newLabels[item.id] = item.data()})
        commit('setLabels', newLabels);
      });
      state.dbRef.collection("memos").onSnapshot((res) => {
        state.memos = res.docs.map(item => item.data());
      });
    },
    addNewLabel: ({state, commit}, newLabel) => {
      if (newLabel) {
        const newObj = {
          name: newLabel,
          timestamp: (new Date).getTime(),
          memos: [],
        }
        state.dbRef.collection("labels").add(newObj);
      }
    },
  }
})

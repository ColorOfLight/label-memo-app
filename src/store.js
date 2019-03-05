import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    labels: {
      l1: {
        name: '라벨 1',
        memos: [
          'm1', 'm2'
        ]
      },
    },
    memos: {
      m1: {
        title: '메모 1',
        labels: [ 'l1' ],
        content: "테스트!"
      },
      m2: {
        title: '메모 2',
        labels: [ 'l1' ],
        content: "테스트 2!!"
      }
    },
    selectedLabel: null,
    selectedMemo: null,
  },
  mutations: {
    
  },
  actions: {

  }
})

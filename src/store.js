import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    labels: {
      l1: {
        name: '라벨 1',
        memos: [
          'm1'
        ]
      },
    },
    memos: {
      m1: {
        title: '메모 1',
        labels: [ ],
        content: "테스트!"
      },
      m2: {
        title: '메모 2',
        labels: [ 'l1' ],
        content: "테스트 2!!"
      }
    },
    selectedLabel: 'l1',
    selectedMemo: null,
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

  }
})

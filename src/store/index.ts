import Vue from 'vue'
import Vuex, { ActionTree, MutationTree } from 'vuex'

Vue.use(Vuex)

export class State {
  username: string | undefined = undefined;
}

export const mutations: MutationTree<State> = {
  setUsername (state, username: string) {
    state.username = username
  },
  clearUsername (state) {
    state.username = undefined
  }
}

export const actions: ActionTree<State, State> = {
  load ({ commit }) {
    const username = window.localStorage.getItem('username')
    if (username && username.length > 0) {
      commit('setUsername', username)
    }
  },
  login ({ commit }, username: string) {
    commit('setUsername', username)
    window.localStorage.setItem('username', username)
  },
  logout ({ commit }) {
    commit('clearUsername')
    window.localStorage.removeItem('username')
  }
}

export default new Vuex.Store({
  state: new State(),
  mutations,
  actions,
  modules: {
  }
})

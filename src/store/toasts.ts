import { MutationTree, ActionTree, Module } from 'vuex'
import State from './state'
import * as uuid from 'uuid'

export class Notification {
  id: string
  state: 'info' | 'error' | 'success'
  message: string
  constructor ({ message, state }: { message: string; state: 'info' | 'error' | 'success' }) {
    this.id = uuid.v4()
    this.state = state
    this.message = message
  }
}

export class ToastState {
  notifications: Notification[] = []
}

export const state: ToastState = {
  notifications: []
}

export const mutations: MutationTree<ToastState> = {
  addNotification (state, notification: Notification) {
    state.notifications.push(notification)
  },
  removeNotification (state, id: string) {
    state.notifications = state.notifications.filter(n => n.id !== id)
  }
}

export const actions: ActionTree<ToastState, State> = {
  add ({ commit }, notification: Notification) {
    commit('addNotification', notification)
    window.setTimeout(() => {
      commit('removeNotification', notification.id)
    }, 5000)
  },
  remove ({ commit }, id: string) {
    commit('removeNotification', id)
  }
}

const toasts: Module<ToastState, State> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default toasts

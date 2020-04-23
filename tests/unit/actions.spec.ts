import { expect } from 'chai'
import { actions } from '../../src/store'
import State from '../../src/store/state'
import * as sinon from 'sinon'
import { ActionContext, ActionMethod } from 'vuex'

const { load, login } = actions

describe('actions', () => {
  it('load', () => {
    const commit = sinon.spy()
    const ctx: ActionContext<State, State> = {
      dispatch: sinon.spy(),
      commit: commit,
      state: { username: undefined },
      getters: {},
      rootGetters: {},
      rootState: { username: undefined }
    }
    const loadAction = (load as ActionMethod)
    loadAction(ctx)
    expect(commit.args).to.deep.equal([])
    window.localStorage.setItem('username', 'aubrey')
    loadAction(ctx)
    expect(commit.args).to.deep.equal([
      ['setUsername', 'aubrey']
    ])
  })

  it('login', () => {
    const commit = sinon.spy()
    const ctx: ActionContext<State, State> = {
      dispatch: sinon.spy(),
      commit: commit,
      state: { username: undefined },
      getters: {},
      rootGetters: {},
      rootState: { username: undefined }
    }
    const loginAction = (login as ActionMethod)
    loginAction(ctx, 'luke')
    expect(commit.args).to.deep.equal([[
      'setUsername',
      'luke'
    ]])
  })
})

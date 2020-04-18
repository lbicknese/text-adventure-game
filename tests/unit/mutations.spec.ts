// mutations.spec.js
import { expect } from 'chai'
import { mutations } from '../../src/store'

// destructure assign `mutations`
const { setUsername } = mutations

describe('mutations', () => {
  it('setUsername', () => {
    // mock state
    const state = { username: undefined }
    // apply mutation
    setUsername(state, 'luke')
    // assert result
    expect(state.username).to.equal('luke')
  })
})

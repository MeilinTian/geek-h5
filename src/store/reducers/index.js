import login from './login'

const { combineReducers } = require('redux')

function test (state = 0, action) {
  return state
}

function user(state = {name: 'zs'}, action) {
  return state
}

const reducer = combineReducers({
  login,
  test,
  user,
})

export default reducer
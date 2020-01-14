import { USERINFO } from './action-types'

const defaultState = {
  inputVlaue: '12312312321',
  userinfo: {}
}

export default (state = defaultState, action) => {
  if (action.type === USERINFO) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.userinfo = action.value
    return newState
  }
  return state
}
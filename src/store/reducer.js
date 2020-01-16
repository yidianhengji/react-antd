import { USERINFO, COLLAPSED } from './action-types'

const defaultState = {
  inputVlaue: '12312312321',
  userinfo: {},
  collapsed: false
}

export default (state = defaultState, action) => {
  if (action.type === USERINFO) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.userinfo = action.value
    return newState
  }
  if (action.type === COLLAPSED) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.collapsed = !newState.collapsed
    return newState
  }
  return state
}
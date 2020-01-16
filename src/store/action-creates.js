import { USERINFO, COLLAPSED } from './action-types'

export const userinfoAction = (value) => ({
  type: USERINFO,
  value
})

export const collapsedAction = (value) => ({
  type: COLLAPSED,
  value
})
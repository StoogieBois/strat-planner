import { atom } from 'recoil'

export const toolState = atom({
  key: 'toolState',
  default: 'pencil'
})

export const gameState = atom({
  key: 'gameState',
  default: 'default'
})

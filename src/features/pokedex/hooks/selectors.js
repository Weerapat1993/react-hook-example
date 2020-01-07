import { get } from 'lodash'

export const pokemonSelector = (state, key) => get(state, `keys.${key}`, {
  loading: false,
  error: '',
  isLoaded: false,
  data: {}, 
})
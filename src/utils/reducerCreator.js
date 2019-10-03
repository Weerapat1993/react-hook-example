
export const reducerCreator = (state, action) => {
  const { key } = action
  const setState = (newState) => ({
    ...state,
    ...newState,
  })

  const setStateWithKey = (newState) => setState({
    keys: {
      ...state.keys,
      [key]: {
        ...state.keys[key],
        ...newState
      },
    }
  })

  const setStateWithKeyRequest = (newState) => setStateWithKey({
    loading: true,
    isReload: false,
    error: '',
    ...newState,
  })

  const setStateWithKeySuccess = (newState) => setStateWithKey({
    loading: false,
    isReload: false,
    error: '',
    ...newState,
  })

  const setStateWithKeyFailure = (newState) => setStateWithKey({
    loading: false,
    isReload: false,
    ...newState,
  })

  return {
    setState,
    setStateWithKey,
    setStateWithKeyRequest,
    setStateWithKeySuccess,
    setStateWithKeyFailure,
  }
}
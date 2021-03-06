import { FETCH_POKEMON } from "./actionTypes";
import { reducerCreator } from "../../../utils/reducerCreator";

export const initialState = {
  keys: {},
}


export const postReducer = (state, action) => {
  const { type } = action
  const { setStateWithKeyRequest, setStateWithKeySuccess, setStateWithKeyFailure } = reducerCreator(state, action)
  switch (type) {
    case FETCH_POKEMON.REQUEST:
      return setStateWithKeyRequest();
    case FETCH_POKEMON.SUCCESS:
      return setStateWithKeySuccess({ data: action.data });
    case FETCH_POKEMON.FAILURE:
      return setStateWithKeyFailure({ error: action.error.message });
    default:
      throw new Error();
  }
};


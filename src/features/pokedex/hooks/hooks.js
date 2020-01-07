import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { postReducer, initialState } from './reducer'
import { FETCH } from './actionTypes';
import { cofingLogger } from '../../../config/logger';

export const useFetchPokemon = () => {
  const [state, dispatch] = useReducer(cofingLogger(postReducer), initialState);
  const [number, setPokemonNumber] = useState(1);

  useEffect(() => {
    const fetchDataRequest = () => ({ type: FETCH.REQUEST, key: number })
    const fetchDataSuccess = (data) => ({ type: FETCH.SUCCESS, data, key: number })
    const fetchDataFailure = (error) => ({ type: FETCH.FAILURE, error, key: number })
    const fetchData = () => {
      dispatch(fetchDataRequest());
      return axios(`https://pokeapi.co/api/v2/pokemon/${number}`)
        .then(res => dispatch(fetchDataSuccess(res.data)))
        .catch(error => dispatch(fetchDataFailure(error)))
    };

    // ComponentDidMount & ComponentDidUpdate
    fetchData();
  }, [number]); // shouldComponentUpdate

  return [{ state, setPokemonNumber }];
}
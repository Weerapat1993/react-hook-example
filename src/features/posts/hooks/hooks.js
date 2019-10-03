import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { postReducer, initialState } from './reducer'
import { FETCH } from './actionTypes';
import { cofingLogger } from '../../../config/logger';

export const usePostLists = () => {
  const [state, dispatch] = useReducer(cofingLogger(postReducer), initialState);
  const [search, setSearch] = useState(1);

  useEffect(() => {
    const fetchData = () => {
      dispatch({ type: FETCH.REQUEST, key: search });
      return axios(`https://jsonplaceholder.typicode.com/posts?userId=${search}`)
        .then(res => dispatch({ type: FETCH.SUCCESS, data: res.data, key: search }))
        .catch(error => dispatch({ type: FETCH.FAILURE, error, key: search }))
    };

    // ComponentDidMount
    fetchData();
  }, [search]); 

  return [{ state, setSearch }];
}
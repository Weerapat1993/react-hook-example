import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { postReducer, initialState } from './reducer'
import { FETCH } from './actionTypes';
import { cofingLogger } from '../../../config/logger';

export const usePostLists = () => {
  const [state, dispatch] = useReducer(cofingLogger(postReducer), initialState);
  const [userId, setPost] = useState(1);

  useEffect(() => {
    const fetchData = () => {
      dispatch({ type: FETCH.REQUEST, key: userId });
      return axios(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(res => dispatch({ type: FETCH.SUCCESS, data: res.data, key: userId }))
        .catch(error => dispatch({ type: FETCH.FAILURE, error, key: userId }))
    };

    // ComponentDidMount & ComponentDidUpdate
    fetchData();
  }, [userId]); // shouldComponentUpdate

  return [{ state, setPost }];
}
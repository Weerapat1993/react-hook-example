
import React, { Fragment } from 'react';
import { Post } from './features/posts'
import { Pokedex } from './features/pokedex';

const App = () => (
  <Fragment>
    <Pokedex />
    <hr />
    <Post />
  </Fragment>
  
)

export default App;
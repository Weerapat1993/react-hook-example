
import React, { Fragment } from 'react';
import { Post } from './features/posts'
import { Pokedex } from './features/pokedex';

const App = () => (
  <Fragment>
    <Post />
    <hr />
    <Pokedex />
  </Fragment>
  
)

export default App;
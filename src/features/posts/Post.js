
import React, { useState } from 'react';
import { get } from 'lodash'
import { usePostLists } from './hooks/hooks'

function App() {
  const [query, setQuery] = useState(1);
  const [{ state, setSearch }] = usePostLists();
  const posts = get(state, `keys.${query}.data`, [])
  const loading = get(state, `keys.${query}.loading`, false)
  const error = get(state, `keys.${query}.error`, '')
  return (
    <div>
      <input
        type="text"
        placeholder="User ID"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button type="button" onClick={() => setSearch(query)}>
        Search
      </button>

      {error && <div>{error}</div>}
      
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
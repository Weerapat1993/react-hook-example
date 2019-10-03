
import React, { useState } from 'react';
import { usePostLists } from './hooks/hooks'
import { postSelector } from './hooks/selectors';

function App() {
  const [query, setQuery] = useState(1);
  const [page, setPage] = useState(1);
  const [{ state, setPost }] = usePostLists();
  const { data, loading, error } = postSelector(state, page)

  const handlePage = (page) => {
    
    const { isLoaded } = postSelector(state, page);
    setPage(page)
    if(!isLoaded) {
      setPost(page)
    }
  }
  return (
    <div>
      <input
        type="text"
        placeholder="User ID"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button type="button" onClick={() => handlePage(query)}>
        Search
      </button>

      {error && <div>{error}</div>}
      
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.map(post => (
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
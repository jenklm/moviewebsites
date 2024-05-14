import React, { useState, useEffect } from 'react';
import Movie from './Movie';

export default function MovieList({apiUrl}) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => setMovies(data))
        .catch(error => console.error('API 호출 중 오류 발생:', error));
    }, [apiUrl]);
  
    return (
      <div className='body-container'>
        {movies.results ? (
          movies.results.map((item) => (
            <Movie
              key={item.id}
              title={item.title}
              poster_path={item.poster_path}
              vote_average={item.vote_average}
              overview={item.overview}
            />
          ))
        ) : (
          <p>영화 로딩 중...</p>
        )}
      </div>
    );
}
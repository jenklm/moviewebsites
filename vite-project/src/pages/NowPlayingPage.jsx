import React, { useState, useEffect, useRef, useCallback } from "react";
import Movie from "../components/Movie";
import LoadingSpinner from "../components/LoadingSpinner";
import styled from 'styled-components';

const Body = styled.div`
  background-color: #20254C;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Appcontainer = styled.div`
  background-color: #20254C;
  display: grid;
  grid-template-columns: repeat(6, 1fr); // 6 columns
  gap: 10px;
  justify-items: center;
  padding: 20px;
`;

const NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=c6eb9ce132e74642f9749d5c706b8c6b&page=${page}`);
        const data = await response.json();
        setMovies(prevMovies => [...prevMovies, ...data.results]);
        setHasMore(data.page < data.total_pages);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchMovies();
  }, [page]);

  const lastMovieElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  return (
    <Body>
      <Appcontainer>
        {movies.map((item, index) => {
          if (movies.length === index + 1) {
            return (
              <Movie
                ref={lastMovieElementRef}
                key={item.id}
                title={item.title}
                poster_path={item.poster_path}
                vote_average={item.vote_average}
                overview={item.overview}
              />
            );
          } else {
            return (
              <Movie
                key={item.id}
                title={item.title}
                poster_path={item.poster_path}
                vote_average={item.vote_average}
                overview={item.overview}
              />
            );
          }
        })}
      </Appcontainer>
      {isLoading && <LoadingSpinner />}
    </Body>
  );
};

export default NowPlayingPage;

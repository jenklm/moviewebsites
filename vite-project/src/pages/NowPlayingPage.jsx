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
  margin: 0;
  box-sizing: border-box;
  width: 100%;
`;

const AppContainerWrapper = styled.div`
  background-color: #20254C;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 120px; /* 각 영화 컨테이너 간의 간격 설정 */
  justify-content: center;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr); /* 4 columns for medium screens */
    gap: 15px; /* 간격을 약간 줄임 */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for small screens */
    gap: 10px; /* 더 작은 간격 */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 column for very small screens */
    gap: 10px; /* 더 작은 간격 */
  }
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
      <AppContainerWrapper>
        <AppContainer>
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
        </AppContainer>
      </AppContainerWrapper>
      {isLoading && <LoadingSpinner />}
    </Body>
  );
};

export default NowPlayingPage;

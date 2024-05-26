// NowPlayingPage.js
import React, { useState, useEffect } from "react";
import Movie from "../components/Movie";
import styled from 'styled-components';

const Body = styled.div`
  background-color: #20254C;
  min-height: 100vh;
  display: flex;
  justify-content: center;
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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=c6eb9ce132e74642f9749d5c706b8c6b");
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Body>
      <Appcontainer>
        {movies.map((item) => (
          <Movie
            key={item.id}
            title={item.title}
            poster_path={item.poster_path}
            vote_average={item.vote_average}
            overview={item.overview}
          />
        ))}
      </Appcontainer>
    </Body>
  );
};

export default NowPlayingPage;

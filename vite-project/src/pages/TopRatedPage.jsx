import React from "react";
import Movie from "../components/Movie";
import { useState } from "react";
import { useEffect } from "react";
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


export default function TopRatedPage(){

    const[movies, setMovies] = useState([]);
  
    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=c6eb9ce132e74642f9749d5c706b8c6b");
          const data = await response.json();
          setMovies(data.results);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchMovies();
    }, []);
  
  
    return(
      <Body>
        <Appcontainer>
          {
            movies.map((item)=>{
              return(
                <Movie 
                  title={item.title}
                  poster_path={item.poster_path}
                  vote_average={item.vote_average}
                  overview={item.overview}
                  />
                  
              )
            })
          }
  
        </Appcontainer>
  
      </Body>
    );
  }
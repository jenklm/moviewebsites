import React from "react";
import Movie from "../components/Movie";
import { useState } from "react";
import { useEffect } from "react";


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
      <div>
        <div className="app-container">
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
  
        </div>
  
      </div>
    );
  }
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import Movie from "../components/Movie";

const MainPageContainer = styled.div`
  height: 200%;
  width: 100%;
  margin: none;
  padding: none;
  background-color: #20254C;
`;

const Welcome = styled.div`
  height: 300px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  font-weight: bold;
  font-size: 150%;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const MainPageDown = styled.div`
  height: 120vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #20254C;
`;

const SearchInfo = styled.div`
  margin-bottom: 10px;
  margin-top: 80px;
  color: white;
  font-size: 200%;
  align-items: center;
  justify-content: center;
`;

const MainPageDownWrap = styled.div`
  display: flex;
`;

const MainPageDownInput = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
`;

const TitleInput = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 20px;
`;

const TitleButton = styled.button`
  width: 30px;
  height: 30px;
  margin-top: 25px;
  border-radius: 50px;
  margin-left: 20px;
  background-color: gold;
`;

const MainPageBottom = styled.div`
  width: 1200px;
  height: 700px;
  margin-top: 30px;
  overflow: auto;
  background-color: #111848;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setQuery(searchQuery);
    setSearchQuery(""); // Clear the search input after setting the query
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (!query) {
          setMovies([]);
          return;
        }
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=c6eb9ce132e74642f9749d5c706b8c6b&query=${query}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <MainPageContainer>
      <Welcome>환영합니다</Welcome>
      <MainPageDown>
        <SearchInfo>📽️ Find your movies!</SearchInfo>
        <MainPageDownWrap>
          <MainPageDownInput>
            <TitleInput
              type="text"
              placeholder="영화를 검색하세요"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </MainPageDownInput>
          <div>
            <TitleButton onClick={handleSearch}>🔍</TitleButton>
          </div>
        </MainPageDownWrap>
        {movies.length > 0 && (
          <MainPageBottom>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </MainPageBottom>
        )}
      </MainPageDown>
    </MainPageContainer>
  );
}

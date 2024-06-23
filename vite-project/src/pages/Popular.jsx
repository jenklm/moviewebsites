import React, { useState, useEffect } from "react";
import Movie from "../components/Movie";
import styled from 'styled-components';

const Body = styled.div`
  background-color: #20254C;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background-color: #373b69;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.span`
  color: white;
  margin: 0 10px;
  font-size: 1.2em;
`;

const PopularPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=c6eb9ce132e74642f9749d5c706b8c6b&page=${currentPage}`);
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

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
      <Pagination>
        <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
          &lt;
        </PageButton>
        <PageNumber>{currentPage} / {totalPages}</PageNumber>
        <PageButton onClick={handleNextPage} disabled={currentPage === totalPages}>
          &gt;
        </PageButton>
      </Pagination>
    </Body>
  );
};

export default PopularPage;

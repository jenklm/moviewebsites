import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

export const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";

const MovieDetail = styled.div`
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  opacity: 0;
  transition: opacity 0.5s ease;
  overflow: auto;
  text-overflow: ellipsis;
  padding: 10px;

  h4 {
    margin: 0;
    padding: 10px;
  }
  
  p {
    margin: 0;
    padding: 10px;
  }
`;

const MovieContainer = styled.div`
  width: 250px;
  margin: 8px;
  background-color: #373b69;
  border-radius: 10px;
  color: white;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  display: inline-block;
  top: 30px;

  &:hover ${MovieDetail} {
    opacity: 1;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    width: 100%; /* 모바일 화면에서는 전체 너비로 설정 */
    max-width: 400px; /* 최대 너비 설정 */
    margin: 8px auto; /* 가운데 정렬 */
  }
`;

const MovieImage = styled.img`
  max-width: 100%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const MovieInfo = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;

  h4 {
    margin: 0;
  }

  span {
    margin-left: 3px;
  }
`;

const Movie = React.forwardRef((props, ref) => {
  const navigate = useNavigate();

  const onClickMovieItem = () => {
    navigate(`/${props.title}`, {
      state: props,
    });
  };

  return (
    <MovieContainer ref={ref} onClick={onClickMovieItem}>
      <MovieImage src={IMG_BASE_URL + props.poster_path} alt={props.title} />
      <MovieInfo>
        <h4>{props.title}</h4>
        <span>{props.vote_average.toFixed(1)}</span>
      </MovieInfo>
      <MovieDetail>
        <h4>{props.title}</h4>
        <p>{props.overview}</p>
      </MovieDetail>
    </MovieContainer>
  );
});

export default Movie;

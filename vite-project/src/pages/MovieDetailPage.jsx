import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  width: 400px;
  height: auto;
  margin-bottom: 20px;
  margin: 20px 100px;
`;
const Detailleftwrap = styled.div`
  padding: 300px;
  display:flex;
`;

const Detailrightwrap = styled.div`
  margin-left: 100px;
  
`;

const Vote = styled.div`
  line-height: 100%;
`;

const Contents = styled.div`
  line-height: 150%;
`;

const StarsContainer = styled.div`
  display: flex;
`;

const StarIcon = styled.span`
  color: #FFD700; /* 별의 색상을 노란색으로 지정 */
`;

export default function MovieDetailPage() {
  const { movieName } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?language=ko-KR&api_key=c6eb9ce132e74642f9749d5c706b8c6b&query=${movieName}`);
        setMovie(response.data.results[0]);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [movieName]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const renderStars = () => {
    const rating = Math.round(movie.vote_average / 2); // 10점 만점을 5점 만점으로 변환
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<StarIcon key={i}>&#9733;</StarIcon>); // 별표 아이콘 추가
      } else {
        stars.push(<StarIcon key={i}>&#9734;</StarIcon>); // 빈 별표 아이콘 추가
      }
    }

    return stars;
  };


  return (
    <DetailContainer>
      <Detailleftwrap>
        <Image
          style={{ width: '300px', height: '450px' }}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <Detailrightwrap>
          <div className='title'>
            <div>{movie.title}</div>
          </div>
          <div className='vote'>
            <Vote>평점 {renderStars()}</Vote>
            <div>개봉일 {movie.release_date}</div>
          </div>
          <Contents> {movie.overview ? (
          <>
            <span>줄거리</span>
            <br />
            {movie.overview}
          </>
        ) : (
          'TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다.'
        )}
        </Contents>
        </Detailrightwrap>
      </Detailleftwrap>
    </DetailContainer>
  );
}

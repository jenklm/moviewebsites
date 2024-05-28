import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Background = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  opacity: 0.2;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  left: 30vh;
  background-color: #373b69;
  color: #fff; /* Added to change text color */
`;

const Image = styled.img`
  width: 300px;
  height: 450px;
  margin-bottom: 20px;
  margin: 20px 100px;
`;

const Detailleftwrap = styled.div`
  padding: 300px;
  display: flex;
`;

const Detailrightwrap = styled.div`
  margin-left: 100px;
`;

const Vote = styled.div`
  line-height: 300%;
  font-weight: bold;
  color: #fff; /* Added to change text color */
`;

const Contents = styled.div`
  line-height: 180%;
  color: #fff; /* Added to change text color */
`;

const StarsContainer = styled.div`
  display: flex;
`;

const StarIcon = styled.span`
  color: #FFD700; /* 별의 색상을 노란색으로 지정 */
`;

const CastContainer = styled.div`
  margin-top: 20px;
`;

const CastItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CastImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const CastText = styled.div`
  color: #fff; /* Added to change text color */
`;

const DEFAULT_IMAGE_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s';

export default function MovieDetailPage() {
  const { movieName } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?language=ko-KR&api_key=c6eb9ce132e74642f9749d5c706b8c6b&query=${movieName}`);
        const movie = response.data.results[0];
        setMovie(movie);

        if (movie) {
          const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=c6eb9ce132e74642f9749d5c706b8c6b`);
          setMovieCredits(creditsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [movieName]);

  if (!movie || !movieCredits) {
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
    <Background>
      <BackgroundImage imageUrl={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
      <DetailContainer>
        <Detailleftwrap>
          <Image
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
            <Contents>
              {movie.overview ? (
                <>
                  <span><h4>줄거리</h4></span>
                  {movie.overview}
                </>
              ) : (
                'TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다.'
              )}
            </Contents>
            <CastContainer>
              <h4>감독</h4>
              {movieCredits.crew
                .filter((crewMember) => crewMember.job === 'Director')
                .map((director) => (
                  <CastItem key={director.credit_id}>
                    <CastImage src={director.profile_path ? `https://image.tmdb.org/t/p/w200${director.profile_path}` : DEFAULT_IMAGE_URL} alt={director.name} />
                    <CastText>{director.name}</CastText>
                  </CastItem>
                ))}
              <h4>출연진</h4>
              {movieCredits.cast.slice(0, 5).map((actor) => (
                <CastItem key={actor.cast_id}>
                  <CastImage src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : DEFAULT_IMAGE_URL} alt={actor.name} />
                  <CastText>{actor.name} - {actor.character}</CastText>
                </CastItem>
              ))}
            </CastContainer>
          </Detailrightwrap>
        </Detailleftwrap>
      </DetailContainer>
    </Background>
  );
}

BackgroundImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

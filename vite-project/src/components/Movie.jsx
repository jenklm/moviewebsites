import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

// 이미지 받아오기
// base_url, filr_size => /configuration API 호출하여 검색
// file_path => 특정 미디어 개체에서 가져오려는 파일 경로

export const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";

const MovieDetail = styled.div`
    position: absolute;
    top: 0;
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
    overflow: auto; // 넘어가는 텍스트를 스크롤 바 생성됨.
    text-overflow: ellipsis;
    h4{
        
            margin: 0;
            padding: 10px;
        
    }
    p{

            margin: 0;
            padding: 10px;
        
    }
`;

const MovieContainer = styled.div`
width: 250px;
  margin: 16px;
  background-color: #373b69;
  color: white;
  box-shadow: 3px 3px 5px rgba(0,0,0,0.1);
  position: relative;
  display: inline-block;

  &:hover ${MovieDetail}{
    opacity: 1;
  }
`;

const MovieImage = styled.img`
max-width: 100%;
`;

const MovieInfo = styled.div`
display: flex;
padding: 20px;
justify-content: space-between;
align-items: center;

h4 {
    margin: 0;
}

span {
    margin - left: 3px;
}

`;

// { title, poster_path, vote_average}
const Movie = (props) => {
    const [isHover, setIsHover] = useState(false);
    const navigate = useNavigate();

    const onClickMovieItem = () => {
        navigate(`/${props.title}`, {
            state: props,
        })
    }


    return (
        <MovieContainer onClick={onClickMovieItem}>
            {/* // onMouseEnter={() => setIsHover(true)}
            // onMouseLeave={() => setIsHover(false)} */}
        
            <MovieImage src={IMG_BASE_URL + props.poster_path} alt={props.title} />
            <MovieInfo>
                <h4>{props.title}</h4>
                <span>{(props.vote_average).toFixed(1)}</span>
            </MovieInfo>

            {/* {isHover && (
                <MovieDetail>
                    <h4>{title}</h4>
                    <p>{overview}</p>
                </MovieDetail>
            )} */}
        </MovieContainer>
    );
}

export default Movie;
//alt :
// key는 prop으로 보낼 수 없기에 같은 값을 지닌 다른 이름을 사용해야 함 !! => id로 사용함.
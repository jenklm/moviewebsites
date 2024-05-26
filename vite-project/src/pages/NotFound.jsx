import React from 'react';
import Movie from "../components/Movie";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Errorcontainer=styled.div`
    background-color: #20254C;
    width:100%;
    height: 100%;
 `;

const CLink=styled(Link)`
    color: #fff; 
    text-decoration: none;
    `; 

const Notfoundcontainer = styled.div`
text-align:center;
justify-content: center;
align-items: center;
color:#fff;
height: 100vh;
display: flex;
flex-direction: column; 
font-size:100px;

`;
const T1=styled.p`
font-size:80px;
margin-bottom:30px;
font-weight:bold;
`;

const T2=styled.p`
font-size:30px;
margin-bottom:30px;
`;

const T3=styled.p`
font-size:15px;
margin-bottom:20px;
font-style:italic;
`;

export default function NotFound(){
    return(
        <Errorcontainer>
        <Notfoundcontainer>
        <div className='error'>
            <T1> Oops! </T1>
            <T2> 예상치 못한 에러가 발생했습니다.</T2>
            <T3> Not Found </T3>
            <h4>
                <CLink to ="/">메인으로 이동하기</CLink>
            </h4>
        </div>
        </Notfoundcontainer>
        </Errorcontainer>
       )
}
    

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

export default function LoginPage(){

    return(
        <div className ='error-container'>
        
        <div className='error'>
            <T1> Oops! </T1>
            <T2> 예상치 못한 에러가 발생했습니다.</T2>
            <T3> Not Found </T3>
            
        </div>
        
        </div>
       )
}
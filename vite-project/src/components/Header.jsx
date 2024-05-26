import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  background-color: #20254C;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const Headerwrap = styled.div`
  height: 70px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeftWrap = styled.div`
  display: flex;
  margin-right: 14px;
  padding: 50px;
  font-size: 20px;
`;

const HeaderRightWrap = styled.div`
  display: flex;
  padding-right: 20px;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-right: 14px;
    padding: 8px;
    font-size: 18px;
  }

  li:hover {
    font-weight: bold;
    font-size: 110%;
  }
`;

const UMCMovieLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
`;

const HeadernavItem = styled(Link)`
  color: ${({ isActive }) => (isActive ? 'gold' : 'white')};
  text-decoration: none;
  font-weight: 500;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : '500')};
`;

export default function Header() {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Headerwrap>
        <HeaderLeftWrap>
          <UMCMovieLink to="/">
            UMC Movie
          </UMCMovieLink>
        </HeaderLeftWrap>
        <HeaderRightWrap>
          <ul>
            <li>
              <HeadernavItem to="/signuppage" isActive={location.pathname === '/signuppage'}>
                회원가입
              </HeadernavItem>
            </li>
            <li>
              <HeadernavItem to="/popularpage" isActive={location.pathname === '/popularpage'}>
                Popular
              </HeadernavItem>
            </li>
            <li>
              <HeadernavItem to="/nowplayingpage" isActive={location.pathname === '/nowplayingpage'}>
                Now Playing
              </HeadernavItem>
            </li>
            <li>
              <HeadernavItem to="/topratedpage" isActive={location.pathname === '/topratedpage'}>
                Top Rated
              </HeadernavItem>
            </li>
            <li>
              <HeadernavItem to="/upcomingpage" isActive={location.pathname === '/upcomingpage'}>
                Upcoming
              </HeadernavItem>
            </li>
          </ul>
        </HeaderRightWrap>
      </Headerwrap>
    </HeaderContainer>
  );
}

    

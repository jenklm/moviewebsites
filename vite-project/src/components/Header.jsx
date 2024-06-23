import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';

const HeaderContainer = styled.div`
  background-color: #20254c;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const HeaderWrap = styled.div`
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

    @media (max-width: 1024px) {
      display: none;
    }
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

const HeaderNavItem = styled(Link)`
  color: ${({ isActive }) => (isActive ? 'gold' : 'white')};
  text-decoration: none;
  font-weight: 500;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : '500')};
`;

const HamburgerMenu = styled.div`
  display: none;
  color: white;
  cursor: pointer;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export default function Header({ isSidebarOpen, toggleSidebar }) {
  const location = useLocation();

  return (
    <HeaderContainer>
      <HeaderWrap>
        <HeaderLeftWrap>
          <UMCMovieLink to="/">UMC Movie</UMCMovieLink>
        </HeaderLeftWrap>
        <HeaderRightWrap>
          <ul>
            <li>
              <HeaderNavItem to="/signuppage" isActive={location.pathname === '/signuppage'}>
                회원가입
              </HeaderNavItem>
            </li>
            <li>
              <HeaderNavItem to="/popularpage" isActive={location.pathname === '/popularpage'}>
                Popular
              </HeaderNavItem>
            </li>
            <li>
              <HeaderNavItem to="/nowplayingpage" isActive={location.pathname === '/nowplayingpage'}>
                Now Playing
              </HeaderNavItem>
            </li>
            <li>
              <HeaderNavItem to="/topratedpage" isActive={location.pathname === '/topratedpage'}>
                Top Rated
              </HeaderNavItem>
            </li>
            <li>
              <HeaderNavItem to="/upcomingpage" isActive={location.pathname === '/upcomingpage'}>
                Upcoming
              </HeaderNavItem>
            </li>
          </ul>
          <HamburgerMenu onClick={toggleSidebar}>
            {isSidebarOpen ? <IoCloseOutline size={30} /> : <IoMenuOutline size={30} />}
          </HamburgerMenu>
        </HeaderRightWrap>
      </HeaderWrap>
    </HeaderContainer>
  );
}

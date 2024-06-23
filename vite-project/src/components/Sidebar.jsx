import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.div`
  height: 100%;
  width: ${(props) => (props.isOpen ? '250px' : '0')};
  position: fixed;
  top: 0;
  left: 0;
  background-color: #20254c;
  overflow-x: hidden;
  transition: 0.3s;
  z-index: 1;
  padding-top: 60px;
`;

const SidebarContent = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  margin-left: 15px;
`;

const SidebarLink = styled(Link)`
  padding: 10px 15px;
  text-decoration: none;
  font-size: 25px;
  color: white;
  display: block;
  transition: 0.3s;

  &:hover {
    color: gold;
  }
`;

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarContent isOpen={isOpen}>
        <SidebarLink to="/signuppage" onClick={toggleSidebar}>회원가입</SidebarLink>
        <SidebarLink to="/popularpage" onClick={toggleSidebar}>Popular</SidebarLink>
        <SidebarLink to="/nowplayingpage" onClick={toggleSidebar}>Now Playing</SidebarLink>
        <SidebarLink to="/topratedpage" onClick={toggleSidebar}>Top Rated</SidebarLink>
        <SidebarLink to="/upcomingpage" onClick={toggleSidebar}>Upcoming</SidebarLink>
      </SidebarContent>
    </SidebarContainer>
  );
}

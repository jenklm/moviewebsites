import React from "react";
import styled from "styled-components";

const Searchbutton=styled.button`
    width:30px;
    height: 30px;
    margin-top: 25px;
    border-radius: 50px;
    margin-left: 20px;
    background-color: yellow;
    justify-content: center;
    align-items: center;
`;

export default function MainPage(){
    return(
        <div className="mainpage container">
            <div className="mainpage-top">
                환영합니다
            </div>
            <div className="mainpage-down">
                <div className="mainpage-down-title">📽 Find your movies!</div>
                    <div className="mainpage-down-wrap">
                        <div className="mainpage-down-input">
                            <input className="titleinput" type="text" />
                        </div>
                        <div>
                            <Searchbutton >
                            🔍
                            </Searchbutton>
                        </div>
                    </div>
            </div>
        </div>
    );
}
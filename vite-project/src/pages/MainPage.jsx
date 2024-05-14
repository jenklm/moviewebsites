import React from "react";


export default function MainPage(){
    return(
        <div className="mainpage container">
            <div className="mainpage-top">
                환영합니다
            </div>
            <div className="mainpage-down">
                <div className="mainpage-down-title">Find your movies!</div>
                    <div className="mainpage-down-wrap">
                        <div className="mainpage-down-input">
                            <input className="titleinput" type="text" />
                        </div>
                        <div>
                            <button className="titlebutton" >
                               
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    );
}
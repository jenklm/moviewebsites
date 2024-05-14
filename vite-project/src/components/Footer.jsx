import React from "react";
import '../index.css';

export default function Footer(){
    // 현재 사이트 주소 가져오기
    const currentUrl = window.location.href;

    // 항상 보여줄 URL
    const alwaysVisibleUrl = "https://www.makeus.in/umc";

    return(
        <div className="footer-container">
            <div className="footer-wrap">
                <div className="footer-left-wrap">
                    Current Site: {currentUrl}
                </div>
                <div className="footer-right-wrap">
                    Always Visible URL: <a href={alwaysVisibleUrl}>{alwaysVisibleUrl}</a>
                </div>
            </div>
        </div>
    )
}
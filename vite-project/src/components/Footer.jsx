import React from "react";
import styled from "styled-components"

const FooterWrap = styled.div`
    display: none;
`

const FooterLeftWrap = styled.div`
    color: white;
    padding: 10px;
`

const FooterRightWrap = styled.div`
    color: white;
    padding: 10px;
`

export default function Footer(){
    // 현재 사이트 주소 가져오기
    const currentUrl = window.location.href;

    // 항상 보여줄 URL
    const alwaysVisibleUrl = "https://www.makeus.in/umc";

    return(
        <div className="footer-container">
            <FooterWrap>
                <FooterLeftWrap>
                    Current Site: {currentUrl}
                </FooterLeftWrap>
                <FooterRightWrap>
                    Always Visible URL: <a href={alwaysVisibleUrl}>{alwaysVisibleUrl}</a>
                </FooterRightWrap>
            </FooterWrap>
        </div>
    )
}
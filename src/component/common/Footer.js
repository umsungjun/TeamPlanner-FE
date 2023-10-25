import React, { useState } from "react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import theme from "../../style/theme";
export default function Footer(){
    // return(
    //     <>
    //         <FooterWrap>
    //             <div className="footer-wrap">
    //                 <a href="">이용약관 | </a>
    //                 <a href="">개인정보처리방침 | </a>
    //                 <a href="">고객센터 | </a>
    //                 <a href="">사업자정보확인</a>
    //             </div>
    //         </FooterWrap>
    //     </>
    // )
}

const FooterWrap = styled(Box)`
    position: absolute;
    top: 100%;
    width: 100%;
    background-color: #3E322E;
    padding: 1rem 0;
    z-index: 100;

    .footer-wrap{
        padding: 0 5%;
        a{
            font-size: 1.4rem;
            color: #fff;
            font-weight: 500;
            line-height: 150%;
        }
    }
    @media ${() => theme.device.mobile} {
        margin-top: 5rem;
    }
`;
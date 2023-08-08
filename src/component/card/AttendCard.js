import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,ThemeProvider} from '@mui/material';
import Box from "@mui/material/Box";
import theme from "../../style/theme";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function AttendCard(state){
    const theme = createTheme({
        typography:{
            fontFamily : "Pretendard"
        },
        palette: {
            primary: {
              main: "#FF7300",
            },
         },
    })

    return(
        <>
          <ThemeProvider theme={theme}>
                <AttendCardWrap>
                    <div className="profile-box">
                        <div className="img">
                            <AccountCircleIcon />
                        </div>
                        <h2>닉네임</h2>
                    </div>
                    <div className="text-box">
                        <div className="padding">
                            {
                                !state.edit ?
                                <div className="dp-flex">
                                    <h3>활동명</h3>
                                    <StyledCheckbox {...label} defaultChecked size="large"/>
                                </div>
                                :
                                <h3>활동명</h3>
                            }
                            <h4>모집제목 : 정보통신어쩌구 공모전 실력파 모집합니다.</h4>
                            <p>
                            안녕하세요 열심히할 자신 있습니다 뽑아주세요 열심히 하겠습니다 제발요 안녕하세요 열심히할 자신 있습니다 뽑아주세요 제발요 안녕하세요 열심히할 자신 있습니다 뽑아주세요 열심히 하겠습니다 제발요 ...(더보기)
                            </p>
                        </div>
                    </div>
                </AttendCardWrap>
          </ThemeProvider>
        </>
    )
}

const AttendCardWrap = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .dp-flex{
        display: flex;
        align-items: center;
        justify-content: space-between;

    }
    .profile-box{
        display: flex;
        flex-direction: column;
        align-items: center;
        
        width: 20%;
        h2{
            font-size: 1.6rem;
            font-weight: 700;
            line-height: 150%;
            color: #3b3b3b;
        }
        svg{
            width: 8rem;
            height: 8rem;
            color: #FFAD6A;
        }
        img{
            width: 8rem;
            height: 8rem;
            border-radius: 100px;
        }
    }
    .text-box{
        width: 80%;
        border: 1px solid rgba(0,0,0,.1);
        border-radius: 1rem;
        .padding{
            padding: 2rem;
        }
        h3{
            font-size: 1.8rem;
            color: #3b3b3b;
            font-weight: 600;
            line-height: 150%;
            margin-bottom: .5rem;
        }
        h4{
            font-size: 1.6rem;
            color: #3b3b3b;
            font-weight: 500;
            line-height: 150%;
            margin-bottom: .5rem;
        }
        p{
            font-size: 1.4rem;
            color: rgba(0,0,0,.6);
            font-weight: 400;
            line-height: 150%;
        }
    }
    @media ${() => theme.device.tablet} {
        .profile-box{
            width: 10%;
            img{
                width: 5rem;
                height: 5rem;
            }
            svg{
                width: 5rem;
                height: 5rem;
            }
        }
        .text-box{
            width: 75%;
        }
    }
    @media ${() => theme.device.mobile} {
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 1rem;
    padding: 2rem;
    .profile-box{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        
    }
    .text-box{
        width: 100%;
        margin-top: 1rem;
        border: none;
        .padding{
            padding: 0;
        }
    }
}
`;

const StyledCheckbox = styled(Checkbox)`
      @media ${() => theme.device.mobile} {
        position: absolute;
        top: 2rem;
        right: 2rem;
      }
`;


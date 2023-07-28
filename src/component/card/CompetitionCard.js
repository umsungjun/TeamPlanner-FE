import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Link } from "@mui/material";
import theme from "../../style/theme";
import IconWrap from "../list/IconWrap";

export default function CompetitionCard({id, className, activityName, activityImg, likeCount, viewCount,deadlineInDays,commentCount}){
    return(
        <>
        
        <Link href={`/competition/detail/${id}`}>
            <CardWrap activityImg={activityImg}>
                <Card id={id} className={className}>
                    <div className="dday">
                        <h3>D-{deadlineInDays}</h3>
                    </div>
                    <div className="info">
                        <div className="padding-wrap">
                            <h2>{activityName}</h2>
                            <IconWrap likeCount={likeCount} viewCount={viewCount} commentCount={commentCount}/>
                        </div>
                    </div>
                </Card>
            </CardWrap>
        </Link>
        </>
    )
}
const CardWrap = styled(Box)`
    cursor: pointer;
    background-image: url(${props => props.activityImg});
    background-size: contain;
    #box1{
        background-image: url(../img/card/sample.png);
    }
    #box2{
        background-image: url(../img/card/sample2.png);
    }
    .small{
        height: 25rem;
    }
`;

const Card = styled(Box)`
    width: 100%;
    height: 33rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 1rem;
    position: relative;
    box-shadow: none;
    transition: box-shadow .2s ease-in-out;

    .dday{
        padding: .5rem .8rem;
        background-color: #fff;
        border-radius:100px;
        width: 20%;
        position: absolute;
        top: 2rem;
        left: 2rem;
        width: 5rem;
        min-width: 5rem;
        h3{
            font-size: 1.8rem;
            font-weight: bold;
            color: #3b3b3b;
            text-align: center;
        }
    }
    .info{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgba(255,255,255,.7);
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        h2{
            font-size: 2rem;
            color: #3b3b3b;
            line-height: 150%;
            font-weight: bold;
            margin-bottom: .5rem;
        }
        .padding-wrap{
            padding: 2rem;
        }
    }

    &:hover{
        box-shadow: 0 0 5px 3px rgba(0,0,0,.1);
    }

    @media ${() => theme.device.desktop} {
        height: 25rem;
    }
    @media ${() => theme.device.mobile} {
        .dday{
            width: 4rem;
            min-width: 4rem;
            h3{
                font-size: 1.4rem;
            }
        }
        .info{
            h2{
                font-size: 1.8rem;
            }
        }
    }
    @media ${() => theme.device.mobile2} {
        height: 20rem;
    }
`;
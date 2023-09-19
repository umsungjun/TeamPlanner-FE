import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from '@mui/material'; // Import ThemeProvider
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import theme from "../../style/theme";
import FilledBtn from "../../component/button/FilledBtn";


// ... (rest of your imports)

const TechStackModal = ({ techStackData, onTechStackSelect, onClose }) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestedTechStacks, setSuggestedTechStacks] = useState([]);

    useEffect(() => {
        setSuggestedTechStacks(techStackData);
    },[techStackData]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        // 입력값과 일치하는 기술 목록을 추천 목록으로 설정합니다.
        const matchingTechStacks = techStackData.filter((techStack) =>
        techStack.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestedTechStacks(matchingTechStacks);
    };

    const handleTechStackSelect = (selectedTechStack) => {
        // 선택된 기술을 부모 컴포넌트로 전달합니다.
        onTechStackSelect(selectedTechStack);
        // 입력값을 초기화합니다.
        setInputValue('');
        // 추천 목록을 비웁니다.
        setSuggestedTechStacks(techStackData);
    };

    const theme = createTheme({
        typography:{
            fontFamily : "Pretendard"
        },
        palette: {
            primary: {
            main: "#FF7300",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}> {/* Wrap with ThemeProvider */}
        <Content>
            <div className="tech-stack-modal">
            <input
                type="text"
                className="tech-stack-input"
                placeholder="기술을 입력하세요."
                value={inputValue}
                onChange={handleInputChange}
            />
            <ul className="tech-stack-list">
                {suggestedTechStacks.map((techStack) => (
                <li className="tech-stack-item"
                    key={techStack.id}
                    onClick={() => {
                        handleTechStackSelect(techStack);
                        onClose();
                    }}
                >
                    {techStack.name}
                </li>
                ))}
            </ul>
            <CloseBtn onClick={onClose}>닫기</CloseBtn>
            </div>
        </Content>
        </ThemeProvider>
    );
};

// Rest of your component code
/* Tech Stack Modal */
const Content = styled(Box)`
    .tech-stack-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border: 1px solid #ccc;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        padding: 20px;
        max-width: 400px;
    }

    /* Tech Stack List */
    .tech-stack-list {
        display: flex;
        flex-wrap: wrap;
        max-height: 300px;
        overflow: auto; 
    }

    .tech-stack-item {
        border: 1px solid rgba(0, 0, 0, 0.1);
        width: 45%;
        padding: 0.3rem;
        margin-right: 2%;
        transition: transform 0.2s ease-in-out;
        font-size: 1.5rem;

        &:hover {
            transform: scale(1.05);
        }

        h4 {
            font-weight: bold;
            margin: 0;
            margin-bottom: 0.5rem;
        }

        p {
            font-size: 1.4rem;
            color: #3b3b3b;
            line-height: 150%;
        }

        .tag-wrap {
            margin-top: 1rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            h5 {
                font-size: 1.2rem;
                color: #3b3b3b;
                background-color: #efefef;
                padding: 0.5rem;
                margin-right: 1rem;
                border-radius: 2px;
            }

            h5:last-of-type {
                margin: 0;
            }
        }

        button {
            position: absolute;
            top: 2rem;
            right: 2rem;
            background-color: #fff;
            padding: 0;
            svg {
                width: 2.5rem;
                height: 2.5rem;
                color: #f30c0c;
            }
        }

        &:last-child {
            margin-right: 0;
        }
    }
`
const CloseBtn = styled(Box)`
    display: flex;
    align-items: flex-end;
    background-color: #FF7300; 
    color: white; 
    font-size : 1.5rem;
    font-weight: 600;
    line-height: 150%;
    width: 4rem; 
    button{
        width: 15%;
    }
    padding-left: 1rem;
    @media ${() => theme.device.mobile}{
        button{
            width: 100%;
        }
    }
`;

export default TechStackModal;


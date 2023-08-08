import React, { useState } from "react";
import styled from "@emotion/styled";
import { createTheme, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import theme from "../../style/theme";

export default function SolidBtn({ text, handle, disabled }) {

  const theme = createTheme({
    typography: {
      fontFamily: "Pretendard",
    },
    palette: {
      primary: {
        main: "#FF7300",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <SolidButton
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handle}
          disabled={disabled}
        >
          {text}
        </SolidButton>
      </ThemeProvider>
    </>
  );
}

const SolidButton = styled(Button)`
  font-size: 1.6rem;
  font-weight: 500;
  box-shadow: none;
  border-radius: 4px;
  padding: 1rem 0;
  color: #ff7300 !important;
  &:hover {
    background-color: #ff7300;
    box-shadow: none;
    color: #fff !important;
  }
  @media ${() => theme.device.mobile2} {
    font-size: 1.4rem;
  }
`;

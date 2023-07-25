import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from "@emotion/styled";
import {createTheme,ThemeProvider} from '@mui/material';

export default function BasicSelect() {
  const [select, setSelect] = React.useState('10');

  const handleChange = (event) => {
    setSelect(event.target.value);
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
})

  return (
    <ThemeProvider theme={theme}>
        <SelectWrap sx={{ minWidth: 120 }}>
        <FormControl fullWidth size="small">
            <StyledSelect
            value={select}
            defaultValue={10}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'Without label' }}
            >
            <StyledMenuItem value={10}>조회순</StyledMenuItem>
            <StyledMenuItem value={20}>최신순</StyledMenuItem>
            <StyledMenuItem value={30}>좋아요순</StyledMenuItem>
            </StyledSelect>
        </FormControl>
        </SelectWrap>
    </ThemeProvider>
  );
}

const SelectWrap = styled(Box)`
    .MuiOutlinedInput-root{
        font-size: 1.4rem;
    }
`;

const StyledSelect = styled(Select)`
    border-radius: 100px;
`;

const StyledMenuItem = styled(MenuItem)`
    font-size: 1.4rem;
`;
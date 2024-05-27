import styled from "styled-components";

export const MainButton = styled.button `
    width: 100%;
    height: 40px;
    border-radius: 6px;
    font-weight: 500;
    font-size: ${(props) => props.theme.typography.body1}rem;
    line-height: 19px;
    text-align: center;
    cursor: pointer;
    border: none;
    `
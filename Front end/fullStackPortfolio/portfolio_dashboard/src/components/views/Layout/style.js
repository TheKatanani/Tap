import styled from "styled-components";

export const StyleLayout = styled.div `
  display:grid;
  grid-template-columns: auto 1fr;
  background-color:#fff;
  aside{
    padding: 20px 0;
    background-color: gray;
    min-height: 100vh;
    h3{
      font-size: 20px;
      font-family: fantasy;
      padding:10px 20px 20px;
      text-shadow: 5px 5px 5px #333;
      text-decoration: underline;
      font-weight: normal;
    letter-spacing: 2px;
    margin-bottom: 20px;

    }
    a{
      &.active li
      , &:hover li{
        background-color: #999;
        transition: 0.3s;
      }
      &:first-child li{
        border-top:1px solid #333
      }
      li{
        padding: 15px;
        border-bottom:1px solid #333
      }
    }
  }
  main{
    padding:20px;
    height: 100vh;
    overflow-y: auto;
  }
  nav{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90%;
    > button{
      border:2px solid #000;
      padding: 12px 15px;
      margin: 15px 15px;
      border-radius: 12px;
      &:hover{
        background-color:#999;
        transition: 0.3s ease-in-out;
      }
  }
  }
`
import styled from "styled-components";

export const StyleInfo = styled.div`
    background-color: #eeeeee99;
    border-radius: 8px;
    box-shadow: 10px 10px 13px 5px #eee;
    padding: 60px 0;
    margin: 40px 0;

  form {
    width: min(800px,100%);
    margin: 0 auto;
  }
  textarea{
    height: 100px;
    resize: vertical;
  }
  .container{
    display: grid;
    grid-template-columns: auto auto;
    gap:10px;
  }
  .logo{
    display: flex;
    gap:30px;
    img{
      border: 2px solid #000;
    }
  }
`

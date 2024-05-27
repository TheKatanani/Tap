import { switchClasses } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import styled from "styled-components";

export const StyleProject = styled.div`
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
    height: 100px ;
    resize: vertical;
  }
  .title,.links{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap:10px;

  }
  .selects{
    margin: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .images{
    display: flex;
    justify-content: space-evenly;
    gap:30px;
    padding:10px 0;
    margin:10px 0;
    .imageArea{
      width: 200px;
      height: 200px;
      padding: 10px 0;
      /* margin: 10px; */
    }
    img{
      border: 2px solid #000;
    }
  }
  .description{
    width: 100%;
    background-color: #eeeeeeee;
    border-radius: 8px;
    outline: none;
    padding: 10px;
    margin: 10px 0;
    border: 2px solid #eee;
    .feature{
      display: flex;
      align-items: center;
      justify-content: space-between;
      div{
        width: 20%;
        svg{
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
  }
`

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export const Root = styled('span')(
  ({ theme }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 38px;
  height: 24px;
  margin: 10px;
  cursor: pointer;

  &.${switchClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchClasses.track} {
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 24px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
    box-shadow: inset 0px 1px 1px ${
      theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.05)'
    };
  }

  &:hover .${switchClasses.track} {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &.${switchClasses.focusVisible} .${switchClasses.track} {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  & .${switchClasses.thumb} {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    display: block;
    width: 16px;
    height: 16px;
    top: 4px;
    left: 4px;
    border-radius: 16px;
    background-color: #FFF;
    position: relative;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
    box-shadow: 0px 1px 2px ${
      theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.1)'
    };
  }

  &.${switchClasses.checked} {
    .${switchClasses.thumb} {
      left: 18px;
      background-color: #fff;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    }

    .${switchClasses.track} {
      border: none;
      background: ${blue[500]};
    }
  }

  &:hover .${switchClasses.checked} .${switchClasses.track} {
    background: ${blue[700]};
  }

  & .${switchClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `,
);
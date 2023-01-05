import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
const colorChange = keyframes` 
  0% { 
    color: red;

  }
   10% {
    color: #0099ff;
    
  }
  50% {
    color: #00ff00;
  }
  75% {
    color: #ff3399;

  }
  100% {
    color: #6666ff;

  }

`;
const BTN = styled.button`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgb(5, 27, 52);
  border: 2px solid transparent;
  color: rgb(122, 180, 246);
`;

const animate = keyframes`
	0% {
		background-position: 0 0;
	}
	50% {
		background-position: 400% 0;
	}
	100% {
		background-position: 0 0;
	}
`;
const DIV = styled.div`
  aspect-ratio: 1/1;
  border-radius: 50%;
  width: 16%;
  padding: 5px;
  background-color: hsl(212, 56%, 19%);
  @media (max-width: 768px) {
    width: 20%;
  }
  @media (max-width: 425px) {
    width: 25%;
  }
  @media (max-width: 375px) {
    width: 30%;
  }
  @media (max-width: 320px) {
    width: 40%;
  }
  &.activeDiv:hover,
  &.activated {
    aspect-ratio: 1/1;
    border-radius: 50%;
    background: rgb(232, 133, 27);
    background: radial-gradient(
      circle,
      rgba(232, 133, 27, 0.742734593837535) 32%,
      rgba(14, 90, 240, 0.6222864145658263) 86%
    );
    background-size: 400%;
    animation: ${animate} 20s linear infinite;
  }
`;
const TEXTCLICK = keyframes`
  to {
    background-position: 200% center;
  }
`;
const RAINBOW = styled.span`
  &.DivSPAN:hover,
  &.activatedSPAN {
    text-transform: uppercase;
    background-image: linear-gradient(
      -225deg,
      #231557 0%,
      #44107a 29%,
      #ff1361 67%,
      #fff800 100%
    );
    background-size: auto auto;
    background-clip: border-box;
    background-size: 200% auto;
    color: #fff;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${TEXTCLICK} 2s linear infinite;
    display: inline-block;
  }
`;

type Props = {
  el: string;
  isActive: boolean;
  clickHandler: () => void;
};

export const Button = ({ el, clickHandler, isActive }: Props) => {
  const [rainbow, setRainbow] = useState(false);
  const mouseOverOrLeaveHandler = () => {
    setRainbow(!rainbow);
  };

  return (
    <DIV
      className={isActive ? "activated" : "activeDiv"}
      onMouseEnter={mouseOverOrLeaveHandler}
      onMouseLeave={mouseOverOrLeaveHandler}
    >
      <BTN
        onClick={clickHandler}
        className={isActive ? "activatedBTN" : "activeBTN"}
      >
        <RAINBOW
          className={isActive || rainbow ? "activatedSPAN" : "activeSPAN"}
        >
          {el}
        </RAINBOW>
      </BTN>
    </DIV>
  );
};

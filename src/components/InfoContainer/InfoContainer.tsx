import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "./infoContainer.scss";
import styled from "styled-components";
import { AnimatedLetters } from "../HomePage/animatedLetters";
interface Props {
  title: string;
  info: string;
}

const IMG = styled.img`
  width: 100%;
  border-radius: 50px;
  box-shadow: 5px 5px 10px black;
  transition: 1.5s ease-in-out;
  // &:hover {
  //   transform: rotate(360deg);
  // }
`;
const H2 = styled.h2`
  margin: 0 0 20px;
`;

const P = styled.p`
  margin: 0;
  text-align: left;
`;

const PARA = styled.p`
  display: inline-block;
  margin-left: 15px;
  cursor: pointer;
`;

const arr = ["A", "b", "o", "u", "t", " ", "M", "e"];

export const InfoContainer = ({ title, info }: Props) => {
  const { ref, inView } = useInView();
  const [isReadMore, setIsReadMore] = useState(true);
  const [thisClass, setThisClass] = useState("");
  const clickHandler = () => {
    setIsReadMore(!isReadMore);
  };
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsReadMore(true);
    } else {
      setIsReadMore(false);
    }
  }, []);
  useEffect(() => {
    if (inView) {
      setThisClass("text-animate");
      setTimeout(() => {
        setThisClass("img-hover");
      }, 3000);
    } else {
      setThisClass("");
    }
  }, [inView]);
  return (
    <>
      <div className="container" ref={ref}>
        <div className="row">
          <div
            className={
              inView ? `col-3  animate__animated animate__zoomInDown` : "col-3 "
            }
          >
            <IMG src="/images/cv-pic.jpg" alt="" className="img-hover" />
          </div>
          <div
            className={
              inView ? `col-9 animate__animated animate__fadeInRight` : "col-9"
            }
          >
            <AnimatedLetters
              letterClass={thisClass}
              strArray={arr}
              index={10}
            />

            <P>{isReadMore ? info.slice(0, 107) : info}</P>
            {isReadMore ? (
              <>
                <FontAwesomeIcon icon={faArrowDown} onClick={clickHandler} />
                <PARA onClick={clickHandler}>Read More...</PARA>
              </>
            ) : (
              <div>
                <FontAwesomeIcon icon={faArrowUp} onClick={clickHandler} />
                <PARA onClick={clickHandler}>Show Less</PARA>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

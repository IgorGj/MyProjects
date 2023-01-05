import { useEffect, useState } from "react";
import { useTransition, animated, useSpring } from "react-spring";
import styled from "styled-components";
import { Button } from "../Button/Button";
import { Project } from "./Project";
import { Projects, ProjectType } from "./Projects";
import { useInView } from "react-intersection-observer";
import "animate.css";
import { AnimatedLetters } from "../HomePage/animatedLetters";
import { Link } from "react-router-dom";
import { BoxesLoader } from "react-awesome-loaders";

import React from "react";
const DIV = styled.div`
  padding: 50px 0;
`;

const DIVFORTABS = styled.div`
  width: 60%;
  display: flex;
  padding: 0;
  justify-content: space-around;
  margin: 15px auto;
  @media (max-width: 768px) {
    width: 75%;
  }
  @media (max-width: 425px) {
    width: 100%;
  }
`;

const CONTAINER = styled.div`
  width: 75%;
  margin: 0 auto;
  padding-top: 100px;
`;
const ANOTHERDIV = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const ProjectList = () => {
  const { ref, inView } = useInView();
  const allProjects = Projects;
  const [loader, setLoader] = useState(true);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(0);
  const [letterClass, setLetterClass] = useState("text-animate");
  const [howManyTabs, setHowManyTabs] = useState(
    Math.ceil(allProjects.length / 6)
  );
  const [tab, setTab] = useState(1);
  const buttons: string[] = [];

  for (let i = 0; i < howManyTabs; i++) {
    let tab = "TAB";
    buttons.push(tab);
  }
  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      setLoader(false);
    };
    loadData();
  }, []);
  const transition = useTransition(projects, {
    from: { x: -200, y: 0, opacity: 0 },
    enter: (item: any) => (next: any) => next({ x: 0, y: 0, opacity: 1 }),
    leave: { x: 0, y: 300, opacity: 0 },
    exitBeforeEnter: true,
  });
  const clickHandler = (index: number) => {
    setActiveIndex(index);
    setTab(index + 1);
  };
  const secondTransition = useSpring({
    delay: 500,
    from: {
      x: !inView ? 0 : -100,
      opacity: !inView ? 1 : 0,
    },
    to: {
      x: !inView ? -100 : 0,
      opacity: !inView ? 0 : 1,
    },
  });
  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
  }, []);
  useEffect(() => {
    const arr = allProjects.filter((el) => el.tab === tab);
    setProjects(arr);
  }, [tab]);

  return (
    <>
      {!loader && (
        <div ref={ref}>
          <CONTAINER
            className={
              !loader ? `animate__animated animate__fadeInLeft` : undefined
            }
          >
            <h1 className="ml-3">
              <AnimatedLetters
                letterClass={letterClass}
                strArray={[
                  "P",
                  "a",
                  "r",
                  "t",
                  " ",
                  "o",
                  "f",
                  " ",
                  "M",
                  "y",
                  " ",
                  "P",
                  "r",
                  "o",
                  "j",
                  "e",
                  "c",
                  "t",
                  "s",
                ]}
                index={15}
              />
            </h1>
            <DIVFORTABS>
              {buttons?.map((el, index) => (
                <Button
                  key={index}
                  el={`${el}  ${index + 1}`}
                  clickHandler={() => {
                    clickHandler(index);
                  }}
                  isActive={index === activeIndex}
                />
              ))}
            </DIVFORTABS>

            <animated.div
              style={secondTransition}
              className="row row-cols-1 row-cols-md-2 row-cols-lg-3"
            >
              {transition((style, item) => {
                return (
                  <animated.div style={style} className={`col`}>
                    {/* <Link to={`/projects/${item.id}`}> */}
                    <Project
                      title={item.title}
                      description={item.description}
                      tools={item.tools}
                      imgUrl={item.imgUrl}
                      id={item.id}
                    />
                    {/* </Link> */}
                  </animated.div>
                );
              })}
            </animated.div>
          </CONTAINER>
        </div>
      )}
      {loader && (
        <ANOTHERDIV>
          <BoxesLoader
            boxColor={"rgb(240,144,83)"}
            shadowColor={"rgb(233, 167, 127)"}
            duration={1.5}
            desktopSize={"90px"}
            mobileSize={"64px"}
          />
        </ANOTHERDIV>
      )}
    </>
  );
};

import { CSSTransition } from "react-transition-group";
import { TagCloud } from "@frank-mayer/react-tag-cloud";
import { useEffect, useRef, useState } from "react";
import { CircleLoader } from "react-awesome-loaders";
import { AnimatedLetters } from "../HomePage/animatedLetters";
import "../HomePage/letters.scss";
import "./index.scss";
import styled from "styled-components";
const DIV = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ANOTHERDIV = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow-x: "hidden";
  align-items: center;
  flex-direction: row;
  // padding: 0 75px;
  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
    padding: 80px 1rem;
  }
`;

export const TechnicalSkills = () => {
  const [size, setSize] = useState(300);
  const [loader, setLoader] = useState(true);
  const [popUp, setPopUp] = useState(false);
  const nodeRef = useRef(null);

  const handleWheelEvent = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY < 0) {
      setSize(size + 50);
    } else {
      setSize(size - 50);
    }
  };
  const transitionClasses = {
    enter: "animate__animated",
    enterActive: "animate__rotateIn",
    exit: "animate__animated",
    exitActive: "animate__rotateOutUpRight",
  };

  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      setLoader(false);
    };
    loadData();
    if (window.innerWidth <= 768) {
      setSize(150);
    }
    setTimeout(() => {
      setPopUp(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (popUp) {
      setTimeout(() => {
        setPopUp(false);
      }, 4000);
    }
  }, [popUp]);

  return (
    <>
      {!loader && (
        <ANOTHERDIV
          onWheel={handleWheelEvent}
          className="row justify-content-center"
        >
          {" "}
          <CSSTransition
            in={popUp}
            timeout={400}
            nodeRef={nodeRef}
            classNames={transitionClasses}
            unmountOnExit
          >
            <span ref={nodeRef} className="popup">
              Scroll on the Earth to Zoom in/out!
            </span>
          </CSSTransition>
          <div className="col-12 col-sm-9 col-lg-6 offset-lg-1 align-self-center animate__animated animate__fadeInLeft divTag">
            <div className="text-animate-hover">
              <h1>
                <AnimatedLetters
                  letterClass={"text-animate "}
                  strArray={["S", "k", "i", "l", "l", "s "]}
                  index={15}
                />
              </h1>
            </div>
            <div className="text-animate-hover">
              <AnimatedLetters
                letterClass={"text-animate"}
                strArray={["&"]}
                index={23}
              />
            </div>
            <div className="text-animate-hover">
              <AnimatedLetters
                letterClass={"text-animate"}
                strArray={["E", "x", "p", "e", "r", "i", "e", "n", "c", "e"]}
                index={25}
              />
            </div>
            <div className="text-zone">
              <p>
                Expert in front-end development including technologies like
                <span className="tech-tag"> HTML5 </span>,
                <span className="tech-tag">CSS3 </span>,
                <span className="tech-tag">JavaScript </span>,
                <span className="tech-tag">jQuery </span>,
                <span className="tech-tag">React </span>,
                <span className="tech-tag">NextJS </span>,
                <span className="tech-tag">TypeScript </span>,
                <span className="tech-tag">Bootstrap </span>,
                <span className="tech-tag">Sass </span>,
                <span className="tech-tag">Git </span>, etc.
              </p>
              <p>
                I’m not a designer but I have a good sense of aesthetics, and
                experience in responsive, mobile-first web design. I put special
                effort into optimizing my code and providing the best user
                experience. I would love to give you any kind of support also
                after the project's completion. I guarantee a commitment during
                work on your project.
              </p>
              <p>
                Visit my{" "}
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/igor-m-gjorgjievski-10b22b229"
                  rel="noreferrer"
                  className="tech-tag"
                >
                  LinkedIn{" "}
                </a>
                profile for more details. Also you can checkout my cv on this{" "}
                <a
                  target="_blank"
                  href="/Igor-Gjorgjievski-CV-2023.pdf"
                  download
                  className="tech-tag"
                >
                  link
                </a>
                .
              </p>
            </div>
          </div>
          <div className="col-4 align-self-center animate__animated animate__fadeInRight">
            <TagCloud
              options={(w: Window & typeof globalThis): any => ({
                maxSpeed: "fast",
                radius: size,
                initSpeed: "normal",
                direction: 135,
                containerClass: "col-12",
              })}
              onClick={(tag: string, ev: MouseEvent) => alert(tag)}
              onClickOptions={{ passive: true }}
            >
              {[
                "Git",
                "TypeScript",
                "React",
                "CSS3",
                "HTML5",
                "Next",
                "ESLint",
                "Bootstrap",
                "SAAS",
                "JavaScript",
                "JSON",
                "MaterialUi",
                "jQuery",
              ]}
            </TagCloud>
          </div>
        </ANOTHERDIV>
        // </div>
      )}
      {loader && (
        <DIV>
          <CircleLoader
            meshColor={"rgb(240,144,83)"}
            lightColor={"rgb(233, 167, 127)"}
            duration={1.5}
            desktopSize={"90px"}
            mobileSize={"64px"}
          />
        </DIV>
      )}
    </>
  );
};

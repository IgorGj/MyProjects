import {
  faGithub,
  faGitlab,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./custom.module.css";
import anotherStyle from "./button.module.css";
import "animate.css";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import { AnimatedLetters } from "./animatedLetters";
import "./letters.scss";
import { BoxesLoader } from "react-awesome-loaders";
import styled from "styled-components";
import "./index.scss";
import { Link } from "react-router-dom";

const nameArray = ["I", "G", "O", "R"];
const jobArray = [
  "G",
  "J",
  "O",
  "R",
  "G",
  "J",
  "I",
  "E",
  "V",
  "S",
  "K",
  "I",
  ".",
];
const fun = [
  "F",
  "r",
  "o",
  "n",
  "t",
  "E",
  "n",
  "d",
  "",
  "d",
  "e",
  "v",
  "e",
  "l",
  "o",
  "p",
  "e",
  "r",
  ".",
];

const DIV = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CustomHomePage = () => {
  const { ref, inView: isVisible } = useInView();
  const [letterClass, setLetterClass] = useState("text-animate");
  const [loader, setLoader] = useState(true);
  const downloadMethod = () => {
    fetch("Igor-Gjorgjievski-CV-2023.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "Igor-Gjorgjievski-FrontEnd-Developer-CV.pdf";
        alink.click();
      });
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 6000);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      setLoader(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isVisible) {
      setLetterClass("text-animate");
      setTimeout(() => {
        setLetterClass("text-animate-hover");
      }, 6000);
    } else {
      setLetterClass("text-animate-hover");
    }
  }, [isVisible]);

  const clickHandler = (page: string) => {
    if (page === "linkedin") {
      window.open(
        "https://www.linkedin.com/in/igor-m-gjorgjievski-10b22b229",
        "_blank",
        "noreferrer"
      );
    } else if (page === "mail") {
      window.location.href =
        "mailto:igor.m.gjorgjievski@gmail.com?subject=Front-end Application response";
    } else if (page === "gitlab") {
      window.open(
        "https://gitlab.com/igor.m.gjorgjievski",
        "_blank",
        "noreferrer"
      );
    } else if (page === "github") {
      window.open("https://github.com/IgorGj", "_blank", "noreferrer");
    }
  };
  const clickMe = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    target.classList.remove(`${anotherStyle.animate}`);
    target.classList.add(`${anotherStyle.animate}`);
    setTimeout(() => {
      target.classList.remove(`${anotherStyle.animate}`);
    }, 600);
  };

  return (
    <>
      {!loader && (
        <div
          className={`w-100 vh-100`}
          style={{ overflow: "hidden", padding: "80px 0 0" }}
          id="home"
          ref={ref}
        >
          <div
            className={`row mx-auto  justify-content-center align-items-center ${styles.content}`}
          >
            <div
              className={
                !loader
                  ? `animate__animated animate__fadeInLeft ${styles.textLeft} ${styles.text} col-10 col-md-5 p-0`
                  : undefined
              }
            >
              <h2 className={`${letterClass} _15`}>H</h2>
              <h2 className={`${letterClass} _16`}>i,</h2>
              <br />
              <h2 className={`${letterClass} _17`}>I</h2>
              <h2 className={`${letterClass} _18`}>'m</h2>
              <br />
              <AnimatedLetters
                letterClass={letterClass}
                strArray={nameArray}
                index={19}
              />
              <br />
              <AnimatedLetters
                letterClass={letterClass}
                strArray={jobArray}
                index={26}
              />
              <br />
              <AnimatedLetters
                letterClass={letterClass}
                strArray={fun}
                index={45}
              />

              <div className="d-flex justify-content-between justify-content-md-center align-items-center">
                <div>
                  <div
                    className={`${anotherStyle.bubblyButton} w-100`}
                    onClick={(e) => {
                      clickMe(e);
                      downloadMethod();
                    }}
                  >
                    Download CV
                  </div>
                </div>
                <div>
                  <Link
                    to="/contact"
                    className={styles.btn}
                    style={{ margin: "0" }}
                  >
                    Contact Me
                  </Link>
                </div>
              </div>
            </div>

            <div
              className={
                !loader
                  ? `animate__animated animate__fadeInRight ${styles.img} col-9 col-md-6 col-lg-4 mt-5 mt-sm-0`
                  : `${styles.img} col-9 col-md-4`
              }
            >
              <div className={styles.socialIcons}>
                <FontAwesomeIcon
                  icon={faGithub}
                  className={styles.forIcon}
                  size="2x"
                  onClick={() => clickHandler("github")}
                />
                <FontAwesomeIcon
                  icon={faGitlab}
                  className={styles.forIcon}
                  size="2x"
                  onClick={() => clickHandler("gitlab")}
                />
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className={styles.forIcon}
                  size="2x"
                  onClick={() => clickHandler("linkedin")}
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={styles.forIcon}
                  size="2x"
                  onClick={() => clickHandler("mail")}
                />
              </div>
              <img
                className={`${styles.emailIcon}`}
                src="/images/banner/images/email-icon.png"
                alt=""
              />
            </div>
          </div>

          <div className={`${styles.wave} ${styles.theWave}`}>
            <img
              src="/images/banner/images/wave.svg"
              alt=""
              className={styles.theWave}
            />
          </div>
        </div>
      )}
      {loader && (
        <DIV>
          <BoxesLoader
            boxColor={"rgb(240,144,83)"}
            shadowColor={"rgb(233, 167, 127)"}
            duration={1.5}
            desktopSize={"90px"}
            mobileSize={"64px"}
          />
        </DIV>
      )}
    </>
  );
};

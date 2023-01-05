import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { AnimatedLetters } from "../HomePage/animatedLetters";
import { Projects } from "./Projects";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
const DIV = styled.div`
  width: 75%;
  margin: 0 auto;
  padding-top: 100px;
`;
const BTN = styled.button`
  width: 100%;
  height: auto;
  padding: 10px 0;
  margin: 10px 0 0 0;
  &:hover {
    box-shadow: 0 5px 15px rgba(145, 92, 182, 0.4);
  }
`;
const IMG = styled.img`
  width: 100%;
`;
const RIGHTDIV = styled.div`
  width: 25%;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  @media (max-width: 768px) {
    width: 100%;
    top: 100%;
    bottom: 0;
    margin-top: 100px;
  }
`;

const H2 = styled.h2`
  text-align: right;
  text-transform: uppercase;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const ORANGESPAN = styled.span`
  display: block;
  color: rgb(240, 144, 83);
`;
const MUTEDSPAN = styled.span`
  color: rgb(15 50 90);
`;

export const ProjectInformation = () => {
  const { id } = useParams();
  const [letterClass, setLetterClass] = useState("text-animate");

  const project = Projects.find((el) => el.id.toString() === id);
  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 6000);
  }, []);
  if (!project) {
    return <h1 className="text-center">Project Not Found</h1>;
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  const openInNewTab = () => {
    window.open(project.link, "_blank", "noreferrer");
  };
  return (
    <DIV>
      <h1>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={[
            "P",
            "r",
            "o",
            "j",
            "e",
            "c",
            "t",
            " ",
            "I",
            "n",
            "f",
            "o",
            "r",
            "m",
            "a",
            "t",
            "i",
            "o",
            "n",
          ]}
          index={2}
        />
      </h1>
      <Link to="/projects">
        <FontAwesomeIcon icon={faArrowLeftLong} /> To Projects
      </Link>

      <div>
        <div className="col-12 col-md-9 p-0 mx-auto mx-lg-0">
          <Slider {...settings}>
            {project.multiUrl?.map((el) => (
              <div>
                <IMG src={el} alt="el" />
              </div>
            ))}
          </Slider>
        </div>
        <RIGHTDIV>
          <H2>{project.title}</H2>
          <MUTEDSPAN>{project.description}</MUTEDSPAN>
          <ORANGESPAN>{project.bigDes}</ORANGESPAN>
          {project.link && <BTN onClick={openInNewTab}>View Live Demo</BTN>}
        </RIGHTDIV>
      </div>
    </DIV>
  );
};

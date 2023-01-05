import TrackVisibility from "react-on-screen";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const IMG = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 30px;
  object-fit: cover;
`;
const DIV = styled.div`
  margin-top: 20px;
`;
const linkStyle = {
  display: "block",
  textDecoration: "none",
  color: "rgb(240,144,83)",
};
interface Props {
  title: string;
  description: string;
  imgUrl: string;
  tools: string[];
  id: number;
}
export const Project = ({ title, description, imgUrl, tools, id }: Props) => {
  return (
    <div>
      {/* <div
        className={`${
          isVisible ? `animate__animated animate__fadeInLeft` : ""
        } `}
      > */}
      <div className="proj-imgbx">
        <IMG src={imgUrl} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
          <Link to={`/projects/${id}`} style={linkStyle}>
            See This Project
          </Link>
          <DIV className="text-center">
            {tools.map((el, index) => {
              return <img src={`/images/icons/${el}.svg`} alt="" key={index} />;
            })}
          </DIV>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

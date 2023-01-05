import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import styles from "./skills.module.css";

const CONTAINER = styled.div`
  margin-bottom: 15px;
`;
const LI = styled.li`
  margin-left: 15px;
  display: inline-block;
  text-align: left;
  cursor: context-menu;
  font-size: 24px;
  font-weight: bolder;
`;

export const Skill = ({ el }: { el: string }) => {
  const [isActive, setIsActive] = useState(false);
  const mouseOver = () => {
    setIsActive(true);
  };
  const mouseOut = () => {
    setIsActive(false);
  };
  return (
    <div className="col-12 col-md-6">
      <CONTAINER
        className="row justify-content-center align-items-center"
        onMouseEnter={mouseOver}
        onMouseLeave={mouseOut}
      >
        <FontAwesomeIcon
          icon={faCheckSquare}
          className={isActive ? `col-1 ${styles.hoverCheck}` : "col-1"}
          size="xl"
        />
        <LI className="col-6">{el}</LI>
      </CONTAINER>
    </div>
  );
};

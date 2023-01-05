import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import "./index.scss";
type Props = {
  theIcon: IconDefinition;
  isActive: boolean;
  clickHandler: () => void;
  route: string;
};

const LI = styled.li`
  position: relative;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

export const SecondCustomLi = ({
  theIcon,
  isActive,
  clickHandler,
  route,
}: Props) => {
  const [theRoute, setTheRoute] = useState(route);

  useEffect(() => {
    if (route === "home") {
      setTheRoute("");
    }
  }, []);
  return (
    <NavLink to={`/${theRoute}`} onClick={clickHandler} className="link">
      <LI>
        <FontAwesomeIcon
          icon={theIcon}
          size="lg"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </LI>
    </NavLink>
  );
};

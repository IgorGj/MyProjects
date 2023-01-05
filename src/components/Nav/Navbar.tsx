import {
  faHouse,
  faUser,
  faList,
  faAddressBook,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { CustomLi } from "./customLi";
import { SecondCustomLi } from "./secondCustomLi";
const icons = [
  { icon: faHouse, route: "home" },
  { icon: faUser, route: "profile" },
  { icon: faList, route: "skills" },
  { icon: faEye, route: "projects" },
  { icon: faAddressBook, route: "contact" },
];

const UL = styled.ul`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DIV = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: rgb(240, 144, 83);
  width: 90px;
`;

const SECONDUL = styled.ul`
  list-style: none;
  text-align: center;
  margin: 0;
  padding: 10px 0;
  background-color: rgba(10, 58, 112, 0.248);
  width: 75%;
  margin: 0 auto;
  border-radius: 10%/40%;
  @media (min-width: 768px) {
    width: 50%;
  }
`;
const SECONDDIV = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

export const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const location = useLocation();
  useEffect(() => {
    console.log(location);

    setWindowWidth(window.innerWidth);
  }, []);
  return (
    <>
      {windowWidth > 768 ? (
        <CustomLi />
      ) : (
        <SECONDDIV>
          <SECONDUL>
            {icons.map((el, index) => {
              return (
                <SecondCustomLi
                  key={index}
                  theIcon={el.icon!}
                  route={el.route}
                  isActive={activeIndex === index}
                  clickHandler={() => setActiveIndex(index)}
                />
              );
            })}
          </SECONDUL>
        </SECONDDIV>
      )}
    </>
  );
};

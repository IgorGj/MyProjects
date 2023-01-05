import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CustomHomePage } from "./components/HomePage/CustomHomePage";

import "./App.scss";

// import { Navbar } from "./components/Nav/NavBar";
// import { CubeAboutMe } from "./components/AboutMe/Cube";
// import { TechnicalSkills } from "./components/Skills/TechnicalSkills";
// import { ContactPage } from "./components/ContactPage/ContactPage";
// import { ProjectList } from "./components/Projects/ProjectList";
// import { ProjectInformation } from "./components/Projects/ProjectInformation";
import { Navbar } from "./components/Nav/Navbar";
import { CubeAboutMe } from "./components/AboutMe/Cube";
import { TechnicalSkills } from "./components/Skills/TechnicalSkills";
import { ContactPage } from "./components/ContactPage/ContactPage";
import { ProjectList } from "./components/Projects/ProjectList";
import { ProjectInformation } from "./components/Projects/ProjectInformation";

function App() {
  const [offset, setOffset] = useState(0);
  const [toHide, setToHide] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setOffset(window.pageYOffset);
    };
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (offset > 50) {
      setToHide(true);
    } else {
      setToHide(false);
    }
  }, [offset]);

  return (
    <div
      className="App"
      style={{ backgroundColor: "#051b34", color: "rgb(108, 174, 250)" }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<CustomHomePage />} />
        <Route path="/profile" element={<CubeAboutMe />} />
        <Route path="/skills" element={<TechnicalSkills />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:id" element={<ProjectInformation />} />
      </Routes>
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { CardsContainer } from "./components/CardsContainer";
import { CardDetail } from "./components/CardDetail";
import { ErrorPage } from "./components/ErrorPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<CardsContainer />} />
        <Route path="/details/:currentCardId" element={<CardDetail />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

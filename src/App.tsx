import React, { useEffect, useState } from "react";
import mockData from "./data/data.json";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SuggestionList from "./components/SuggestionList/SuggestionList";
import MovieList from "./components/MovieList/MovieList";
import MovieDetailsPage from "./containers/MovieDetailsPage/MovieDetailsPage";
import { DataType } from "./components/MovieList/types";
import Login from "./components/Login/Login";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movieData, setMovieData] = useState<DataType[]>([]);

  useEffect(() => {
    if (searchTerm) {
      fetch(`https://www.omdbapi.com/?apikey=25feb245&s=${searchTerm}`) // niza od filmovi
        .then((res) => res.json())
        .then((data) => {
          setMovieData(data.Search);
        });
    }
  }, [searchTerm]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header setSearchTerm={setSearchTerm} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SuggestionList data={movieData.map((movie) => movie.Title)} />
                <MovieList data={movieData} />
              </>
            }
          ></Route>

          <Route path="/details/:id" element={<MovieDetailsPage />}></Route>

          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

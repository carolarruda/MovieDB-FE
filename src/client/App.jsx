import Login from "../components/Login";
import MovieList from "../components/MovieList";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import RegisterUI from "../components/RegisterUI";

import "./App.css";

export const Context = React.createContext();

const apiUrl = "https://puce-glorious-turtle.cyclic.app";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const opts2 = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      setLoggedIn(true);
      fetch(`https://puce-glorious-turtle.cyclic.app/movie`, opts2)
        .then((res) => res.json())
        .then((data) => {

          setMovies(data);
        })
        .catch((error) => console.error("Error fetching movies:", error));
    }
  }, [token]);

  return (
    <Context.Provider value={[loggedIn, setLoggedIn]}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setMovies={setMovies} />} />
          <Route
            path="/home"
            element={
              loggedIn && (
                <>
                  <MovieList movies={movies} setMovies={setMovies} />
                </>
              )
            }
          />
          <Route
            path="/register"
            element={<Login 
              register={true}
              setMovies={setMovies} />}
          />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;

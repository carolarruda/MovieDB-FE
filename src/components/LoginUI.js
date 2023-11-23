import React, { useState, useContext, useEffect } from "react";
import { Context } from "../client/App";
import "./styles/style.css";
import { useNavigate } from "react-router-dom";
import { keyframes } from "styled-components";

const LoginUI = ({ setMovies }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useContext(Context);
  const [status, setStatus] = useState("");
  const [failed, setFailed] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [red, setRed] = useState("");
  const [redTwo, setRedTwo] = useState("");
  const [shake, setShake] = useState("");
  const [shakeTwo, setShakeTwo] = useState("");

  const sk = "shake 0.2s ease-in-out 0s 2";

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(false);
    localStorage.clear();
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    navigate(`/register`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };


    async function loginUser() {
      try {
        const loginResponse = await fetch(
          `https://rich-wasp-capris.cyclic.app/login`,
          opts
        );
        const data = await loginResponse.json();
        setStatus(loginResponse.status);

        if (loginResponse.status === 200) {
          setLoggedIn(true);
          localStorage.setItem("token", data.token);
          const token = localStorage.getItem("token");
          const opts2 = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          };
          const moviesResponse = await fetch(
            `https://rich-wasp-capris.cyclic.app/movie`, opts2
          );
          const moviesData = await moviesResponse.json();
          console.log('here',moviesData);
          setMovies(moviesData);
          navigate(`/home`);
        } else if (loginResponse.status === 404) {
          setFailed(true);
          setRed("red");
          setRedTwo("red");
          setShake(sk);
          setShakeTwo(sk);
          console.log("Please use register to create a new user");
        } else if (loginResponse.status === 401) {
          setWrong(true);
          setFailed(false);
          setRedTwo("red");
          setRed("red");
          setShakeTwo(sk);
          setShake(sk);
        }
      } catch (error) {
        console.error("Error occurred during login: ", error);
      }
    }

    loginUser();
  };

  return (
    <div className="main">
      <div className="box-content">
        <div className="form">
          <h1>Login</h1>
          <div className="login">
            <p className="undertext">Don't have an account?</p>
            <button className="sign" onClick={handleRegister}>
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="formy">
            <label htmlFor="email">Email</label>
            <input
              style={{
                color: `${red}`,
                animation: `${shake}`,
              }}
              type="text"
              id="email"
              placeholder="email"
              required
              value={email}
              onChange={handleEmail}
            />
            <label htmlFor="password">Password</label>
            <input
              style={{
                color: `${redTwo}`,
                animation: `${shakeTwo}`,
              }}
              type="password"
              id="password"
              placeholder="password"
              required
              value={password}
              onChange={handlePassword}
            />

            {!failed && !wrong && <div></div>}
            {!failed && wrong && (
              <div className="error">You have entered an invalid email or password</div>
            )}

            <button className="log-but" type="submit">
              LOGIN
            </button>
          </form>
        </div>
        <div className="login-image"></div>
      </div>
    </div>
  );
};

export default LoginUI;

import React, { useState, useContext, useEffect } from "react";
import { Context } from "../client/App";
import "./styles/style.css";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import classes from "./Sign.module.css";

const Login = ({ setMovies, movies, register }) => {
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
  const [active, setActive] = useState(true);

  const sk = "shake 0.2s ease-in-out 0s 2";

  const navigate = useNavigate();

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="http://localhost:3000/">
          Randomflix
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    );
  }

  useEffect(() => {
    setLoggedIn(false);
    localStorage.clear();
    if (register) {
      setActive(false);
    }
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    setActive(false);

    navigate(`/register`);
  };
  const handleLogin = () => {
    setActive(true);
    navigate(`/`);
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
          "https://puce-glorious-turtle.cyclic.app/login",
          opts
        );
        const data = await loginResponse.json();
        setStatus(loginResponse.status);

        if (loginResponse.status === 200) {
          setLoggedIn(true);
          localStorage.setItem("token", data.token);
          const token = localStorage.getItem("token");
          localStorage.setItem("userId", data.user.userId);

          let userId = data.user.userId;
          const moviesResponse = await fetch(
            `https://puce-glorious-turtle.cyclic.app/movie`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const moviesData = await moviesResponse.json();
          setMovies(moviesData);
          navigate(`/home`);
        } else {
          setFailed(true);
          setRed("red");
          setRedTwo("red");
          setShake(sk);
          setShakeTwo(sk);
          console.log("Please use register to create a new user");
        }
      } catch (error) {
        console.error("Error occurred during login: ", error);
      }
    }

    loginUser();
  };

  return (
    <div className={classes.background}>
      <div className={classes.formContainer}>
        <h1 className={classes.titleForm}>
          <button
            onClick={handleLogin}
            className={active ? `${classes.active}` : `${classes.inactive}`}
          >
            {" "}
            Login
          </button>{" "}
          |{" "}
          <button
            onClick={handleRegister}
            className={active ? `${classes.inactive}` : `${classes.active}`}
          >
            Signup
          </button>
        </h1>
        <div className={classes.register}>
          <p className={classes.undertext}>Login to access your account</p>
        </div>

        <form
          className={`${classes.formy} ${classes.log}`}
          onSubmit={handleSubmit}
        >
          <input
            style={{
              color: `${red}`,
              animation: `${shake}`,
            }}
            type="text"
            id="username"
            placeholder={`Email Address`}
            required
            value={email}
            onChange={handleEmail}
          />

          <input
            style={{
              color: `${redTwo}`,
              animation: `${shakeTwo}`,
            }}
            type="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={handlePassword}
          />

          <div
            className={failed ? `${classes.error}` : `${classes.errorInactive}`}
          >
            Invalid email and/or password provided
          </div>

          <button className={classes.logBut} type="submit">
            LOGIN
          </button>
          <Copyright sx={{ mt: 5, color: "rgba(122, 122, 122, 0.342)" }} />
        </form>
      </div>
    </div>
  );
};

export default Login;

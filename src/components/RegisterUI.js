import React, { useState, useContext, useEffect } from "react";
import { Context } from "../client/App";
import "./styles/style.css";
import { useNavigate } from "react-router-dom";

const RegisterUI = ({ setMovies }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState("");
  const [loggedIn, setLoggedIn] = useContext(Context);
  const [failed, setFailed] = useState(false);
  const [red, setRed] = useState("");
  const [shake, setShake] = useState("");
  const [status, setStatus] = useState("");
  const [redTwo, setRedTwo] = useState("");
  const [shakeTwo, setShakeTwo] = useState("");

  const sk = "shake 0.2s ease-in-out 0s 2";

  const navigate = useNavigate();
  useEffect(() => {
    setLoggedIn(false);
    localStorage.clear();
  }, []);

  const hanldeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    navigate(`/`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
    };
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };

    async function registUser() {
      try {
        const registerResponse = await fetch(
          "https://puce-glorious-turtle.cyclic.app/register",
          opts
        );

        const data = await registerResponse.json();
        setStatus(registerResponse.status);
        if (registerResponse.status === 201) {
          setUsers(data);
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
                localStorage.setItem("userId", data.user.userId);

                navigate(`/home`);
              } else if (loginResponse.status === 409) {
                setFailed(true);
                setWrong(true);
                setRed("red");
                setRedTwo("red");
                setRedTwo("");
                setShake(sk);
                setShakeTwo("");
                console.log("Please use register to create a new user");
              }
            } catch (error) {
              console.error("Error occurred during login: ", error);
            }
          }

          loginUser();
        } else if (registerResponse.status === 409) {
          setFailed(true);
          setRed("red");
          setShake(sk);
          console.log("Please choose a different email");
        }
      } catch (error) {
        console.error("Error occurred during register: ", error);
      }
    }
    registUser();
  };

  return (
    <div className="main">
      <div className="box-content">
        <div className="form">
          <h1>Register</h1>
          <div className="register">
            <p className="undertext">Already have an account?</p>
            <button className="sign" onClick={handleRegister}>
              Login
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
              onChange={hanldeEmail}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              required
              value={password}
              onChange={handlePassword}
            />
            {failed && (
              <div className="error">
                This email is already taken. Please choose another name.
              </div>
            )}
            {!failed && <div className="error"></div>}
            <button className="log-but" type="submit">
              REGISTER
            </button>
          </form>
        </div>
        <div className="login-image"></div>
      </div>
    </div>
  );
};

export default RegisterUI;

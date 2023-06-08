import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import "./Login.scss";
import { UserContext } from "../../components/UserContext";
import LoginSuccessAlert from "./../../components/Alerts";
import Logo from '../../images/logo.png'
import Loginfinalyze from '../../images/login-finalyze.png'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [jibu, setjibu] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [failedlogin, setfailedlogin] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const demomode = window.location.pathname === "/demo"
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setfailedlogin(false);
    axios
      .post(
        "https://backend.finalyze.app/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (
          response.status === 400 ||
          response.status === 401 ||
          response.status === 404
        ) {
          setText("Invalid Credentials");
          setfailedlogin(true);
        } else if (response.data) {
          setText("Login Successful");
          setLoggedIn(true);
          localStorage.setItem("jwt", response.data.token);
          setUser(response.data.username.name);
          setTimeout(() => {
            history.push("/dashboard");
          }, 1500);
        } else {
          setText("Login Failed");
          setfailedlogin(true);
        }
      })
      .catch((error) => {
        setfailedlogin(true)
        setTimeout(() => {
          setfailedlogin(false);
        }, 3000)
      });
  };

  return (
    <>
      {loggedIn ? (
        <div className="position-absolute top-50 translate-middle start-50 w-25 success-al">
          <LoginSuccessAlert />
        </div>
      ) : (
        <>
          <div className="Login">
            {failedlogin ? (
              <div className="error-alert">
                <div className="fail-error">
                  <h4>You shall not pass!</h4>
                  <p>
                    Your login attempt was unsuccessful. Let's try that again
                  </p>
                </div>
              </div>
            ) : null}
            {
              demomode &&
              <div className="demo-alert">
                <h4>Finalyze Demo Mode</h4>
                <p>To proceed, use <span>'demo'</span> as the username and <span>'demo.finalyze'</span> as the password</p>
              </div>
            }
            {
              demomode ?
                <></>
                :
                <div className="login-intro">
                  <h1>Welcome Back to</h1>
                  <img src={Loginfinalyze} alt="" />
                </div>
            }
            <div className="container">
              <h4>Login to your Account</h4>
              <form>
                <label>
                  Username:
                  <input
                    type="text"
                    placeholder="Enter your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
                <label id="password">
                  Password:
                  <span className="password-input">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className="action-holder"
                      style={showPassword ? { backgroundColor: "#267b8ca7", color: "#fff", transition: "0.5s ease-in-out" } : null}
                    >
                      {
                        !showPassword ?
                          <AiFillEye id="eye" onClick={() => setShowPassword(true)}>
                            {showPassword && 'Hide Password'}
                          </AiFillEye>
                          :
                          <>
                            <AiFillEyeInvisible
                              id="eye"
                              onClick={() => setShowPassword(false)}
                            >
                              {!showPassword && 'Show Password'}
                            </AiFillEyeInvisible>
                          </>
                      }
                    </div>
                  </span>
                </label>
                <button type="button" onClick={handleLogin}>
                  Login
                </button>
              </form>
            </div>
            <h5>{text}</h5>

            {/* <div className="logo">
              <img src={Logo} alt="" />
              <h1>Finalyze 🚀</h1>
          </div> */}
          </div>
        </>
      )}
    </>
  );
}

export default Login;

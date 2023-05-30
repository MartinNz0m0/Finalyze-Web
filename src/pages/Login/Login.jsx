import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import "./Login.scss";
import { UserContext } from "../../components/UserContext";
import LoginSuccessAlert from "./../../components/Alerts";

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
                <Alert show variant="dark" className="bg-opacity-25">
          <Alert.Heading className="text-center">Finalyze Demo Mode</Alert.Heading>
          <p>To proceed, use 'demo' as username and password</p>
        </Alert>
              </div>
            }
            <div className="container">
              <h1>Login</h1>
              <form>
                <label className="m-3">
                  Username:
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
                <label className="m-3">
                  Password:
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <button type="button" onClick={handleLogin}>
                  Login
                </button>
              </form>
            </div>
            <h5>{text}</h5>
          </div>
        </>
      )}
    </>
  );
}

export default Login;

import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import LoginSuccessAlert, { FailedLoginAlert } from "./Alerts";

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [jibu, setjibu] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [failedlogin, setfailedlogin] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleLogin = () => {
    setfailedlogin(false);
    axios
      .post(
        "http://localhost:8000/login",
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
      });
  };

  return (
    <div className="w-100">
      {loggedIn ? (
        <div className="position-absolute top-50 translate-middle start-50 w-25">
          <LoginSuccessAlert />
        </div>
      ) : (
        <div className="position-absolute top-50 start-50 translate-middle">
          {failedlogin ? (
            <div className="">
              <FailedLoginAlert show={failedlogin}/>
            </div>
          ) : null}
          <h1 className="text-center mb-3 text-info">Login</h1>
          <div>
            <form className="d-flex flex-column">
              <label className="m-3">
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <br />
              <br />
              <label className="m-3">
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <br />
              <br />
              <button
                type="button"
                className="text-center btn btn-submit btn-lg w-50 btn-outline-info"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
          </div>
          <h5>{text}</h5>
        </div>
      )}
    </div>
  );
}

export default Login;

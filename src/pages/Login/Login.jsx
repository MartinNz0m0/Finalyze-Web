import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import UserDashboard from '../Dashboard/UserDashboard';
import { useEffect } from 'react';
import './Login.scss'
import { UserContext } from '../../components/UserContext';
import LoginSuccessAlert, { FailedLoginAlert } from "./../../components/Alerts";

function Login() {
  const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [text, setText] = useState('');
    const [jibu, setjibu] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
  const [failedlogin, setfailedlogin] = useState(false);
    const { user, setUser } = useContext(UserContext)

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
        <>
            {
                loggedIn ?
                    <div className="position-absolute top-50 translate-middle start-50 w-25">
          <LoginSuccessAlert />
        </div>
      
                    :
                    <>
                        <div className='Login'>
{failedlogin ? (
            <div className="">
              <FailedLoginAlert show={failedlogin}/>
            </div>
          ) : null}
                            <div className="container">
                                <h1>Login</h1>
                                <form>
                                    <label className='m-3'>
                                        Username:
                                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </label>
                                    <label className='m-3'>
                                        Password:
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </label>
                                    <button type="button" onClick={handleLogin}>Login</button>
                                </form>
                            </div>
                            <h5>{text}</h5>
                        </div >
                    </>
            }
        </>
    );
}

export default Login;

import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserDashboard from '../Dashboard/UserDashboard';
import { useEffect } from 'react';
import './Login.scss'
import { UserContext } from '../../components/UserContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [text, setText] = useState('');
    const [jibu, setjibu] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const { user, setUser } = useContext(UserContext)

    const handleLogin = () => {

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
                console.log(response.data)
                if (response.data) {
                    setText('Login Successful')
                    setLoggedIn(true)
                    setUser(response.data.username)
                    localStorage.setItem('jwt', response.data.token);
                    console.log(user)
                }
            })


        // const hashedPassword = sha256(password)
        // make api call to verify username and hashedPassword
        // if successful, set loggedIn to true


    }
    useEffect(() => {
        if (loggedIn) {
            const jwt = localStorage.getItem('jwt');
            axios.post("http://localhost:8000/dash", { user }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                },
            })
                .then((response) => {
                    setjibu(response.data)
                })
        }

    }, [loggedIn])



    return (
        <>
            {
                loggedIn ?
                    <>
                        <UserDashboard jibu={jibu} />

                    </>
                    :
                    <>
                        <div className='Login'>
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

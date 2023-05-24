import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [masterPassword, setMasterPassword] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleMasterPasswordChange = (event) => {
    setMasterPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordsMatch(event.target.value === passwordConfirmation);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
    setPasswordsMatch(event.target.value === password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === passwordConfirmation) {
      // TODO: Handle form submission
    try {
          axios
                .post(
                    "http://localhost:8000/register",
                    { masterPassword, username, password },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    if (response.status == 500) {
                        console.log('Something went wrong')
                    }
                    if (response.status == 503) {
                        console.log('Wrong master password')
                    }
                    if (response.data === "Success") {
                      alert('Registration Successful')
                    }
                })
    } catch (error) {
        console.log(error)
    }
    } 
    
    else {
      setPasswordsMatch(false);
    }
  };

  return (
    <div className='position-absolute top-50 start-50 translate-middle'>

    <div className=''>

    <form onSubmit={handleSubmit}>
      <label>
        Master Password:
        <input type="password" value={masterPassword} onChange={handleMasterPasswordChange} />
      </label>
      <br />
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <label>
        Confirm Password:
        <input type="password" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} />
      </label>
      {!passwordsMatch && <p>Passwords do not match.</p>}
      <br />
      <button type="submit">Register</button>
    </form>
    </div>
    </div>
  );
};

export default Register;

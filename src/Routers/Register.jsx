import React, { useState } from 'react';

function Register() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleEmailChange = (event) => {
    setEmail(event.target.value);
};

const handlePasswordChange = (event) => {
    setPassword(event.target.value);
};

const handleSubmit = (event) => {
    event.preventDefault();
    // send registration request to server and handle response
};

return (
    <form onSubmit={handleSubmit}>
    <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
    </label>
    <br />
    <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
    </label>
    <br />
    <button type="submit">Register</button>
    </form>
);
}

export default Register;

import React, { useRef } from 'react';
import "./register.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    //hook
    const navigate = useNavigate();
    const handleClick = async (e) => {
        e.preventDefault();
        let user;
        if(password.current.value !== passwordAgain.current.value) {
            passwordAgain.current.setCustomValidity("Password didn't match!");
        } else {
            user = {
                username : username.current.value,
                email : email.current.value,
                password : password.current.value,
            }
        }
        try {
            await axios.post("/auth/register", user);
            console.log(`${username.current.value} has been registered.`)
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Lamasocial</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on Lamasocial.
                </span>
            </div>
            <div className="loginRight">
                <form onSubmit={handleClick}className="loginBox">
                    <input 
                        placeholder="Username"
                        ref={username}
                        required
                        className="loginInput" 
                    />
                    <input 
                        placeholder="Email"
                        type='email'
                        ref={email}
                        required
                        className="loginInput" 
                    />
                    <input
                        required
                        ref={password} 
                        placeholder="Password"
                        type='password'
                        className="loginInput"
                        minLength={6}
                    />
                    <input
                        ref={passwordAgain} 
                        placeholder="Password Again"
                        type='password'
                        className="loginInput" 
                    />
                    <button type='onsubmit' className="loginButton">
                        Sign Up
                    </button>
                    <button type='onsubmit' className="loginRegisterButton">
                        Log into Account
                    </button>
                </form>
            </div>
        </div>
    </div>
    );
};

export default Register;
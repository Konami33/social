import React, { useContext, useRef } from 'react';
import "./login.css";
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const email = useRef();
    const password = useRef();

    const {user, isFetching, dispatch} = useContext(AuthContext); 

    const handleClick = (e) => {
        e.preventDefault();
        //console.log(email.current);
        loginCall({
            email: email.current.value, 
            password: password.current.value
        }, dispatch);
    };
    console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social</h3>
                    <span className="loginDesc">
                        Connect With friends and the world around you on Social
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input 
                            placeholder='Email' type="email" 
                            required
                            className="loginInput"
                            ref={email}
                        />
                        <input
                            placeholder='Password' type="password"
                            required
                            minLength={6}
                            className="loginInput"
                            ref={password}
                        />
                        <button className="loginButton" type='submit' disabled={isFetching}>
                            {isFetching? "Loading":"Log In"}
                        </button>
                        <span className="loginForgot">
                            Forgot Passoword?
                        </span>
                        <button className="loginRegisterButton">
                            Create a New Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
import React, { useState } from "react";
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");  // State for email
    const [password, setPassword] = useState("");  // State for password
    const [errorMessage, setErrorMessage] = useState("");  // State for handling errors
    const [isNewUser, setIsNewUser] = useState(false);  // Toggle between sign in and sign up

    const handleAuth = () => {
        if (isNewUser) {
            // Sign up if the user is new
            createUserWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    localStorage.setItem("isAuth", true);
                    setIsAuth(true);
                    navigate("/")
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                });
        } else {
            // Sign in if the user is existing
            signInWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    localStorage.setItem("isAuth", true);
                    setIsAuth(true);
                    navigate("/")
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                });
        }
    };

    return (
        <div className="LoginPage">
            <p>{isNewUser ? "Sign up with email and password" : "Sign in using email and password to continue"}</p>
            
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button className="auth-btn" onClick={handleAuth}>
                {isNewUser ? "Sign up with Email" : "Sign in with Email"}
            </button>

            <button onClick={() => setIsNewUser(!isNewUser)}>
                {isNewUser ? "Already have an account? Sign in" : "New user? Sign up"}
            </button>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Display error */}
        </div>
    );
}

export default Login;

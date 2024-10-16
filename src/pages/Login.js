import React, { useState } from "react";
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import "../Login.css"; // Make sure to import your CSS file

function Login({ setIsAuth }) {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");  // State for email
    const [password, setPassword] = useState("");  // State for password
    const [errorMessage, setErrorMessage] = useState("");  // State for handling errors
    const [isNewUser, setIsNewUser] = useState(false);  // Toggle between sign in and sign up
    const [firstName, setFirstName] = useState("");  // State for first name (Added)
    const [lastName, setLastName] = useState("");  // State for last name (Added)

    const handleAuth = () => {
        if (isNewUser) {
            // Sign up if the user is new
            createUserWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    updateProfile(result.user,
                        {
                            displayName : `${firstName} ${lastName}`,
                        }
                    ).then(() =>{
                        localStorage.setItem("isAuth", true);
                        setIsAuth(true);
                        navigate("/")

                    }).catch((error) => {
                    setErrorMessage(error.message);
                });
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
            {isNewUser &&
            (
                <>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </>

            )}
            
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
                {isNewUser ? "Sign up" : "Sign in"}
            </button>

            <button onClick={() => setIsNewUser(!isNewUser)}>
                {isNewUser ? "Already have an account?" : "New user?"}
            </button>

            {errorMessage && <p className="errorMessage">{errorMessage}</p>}

        </div>
    );
}

export default Login;

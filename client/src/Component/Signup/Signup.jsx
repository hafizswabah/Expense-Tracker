import React, { useEffect, useState } from 'react';
import './Signup.css'; // Import your stylesheet
import { Link } from 'react-router-dom';
import { FiInstagram, FiGithub, FiMail } from "react-icons/fi";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
const SlideFormComponent = () => {

    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [name, setName] = useState("")
    const [email, setMail] = useState("")
    const [profession, setProfession] = useState("")
    const [password, setPassword] = useState("")
    const [errMessage, setErrMessage] = useState(null)
    const [err, setErr] = useState(false)
    const [spin, setSpin] = useState(false)
    const dispatch = useDispatch()
    const toggleForm = () => {
        setIsSignUpActive(!isSignUpActive);
    };

    async function handleSignup(e) {
        e.preventDefault()
        setSpin(true)
        if (!err) {
            let { data } = await axios.post("/user/auth/signup", { name, email, password, profession })
            if (data.err) {
                setErrMessage(data.message)
            } else {
                dispatch({ type: "refresh" })
            }
            setSpin(false)
        }
    }
    async function handleLogin(e) {
        e.preventDefault()
        setSpin(true)
        if (!err) {
            let { data } = await axios.post("/user/auth/login", { email, password })
            if (data.err) {
                setErrMessage(data.message)
            } else {
                dispatch({ type: "refresh" })
            }
            setSpin(false)
        }
    }

    useEffect(() => {
        if (name.trim() === "" || email.trim() === "" || profession.trim() === "") {
            setErrMessage("Enter Required Details")
            setErr(true)
        } else {
            setErrMessage("")
            setErr(false)
        }

    }, [name, email, profession])
    useEffect(() => {
        if (password.length > 0 && password.length < 5) {
            setErrMessage("Password must be five charachters")
            setErr(true)
        } else {
            setErrMessage("")
            setErr(false)
        }

    }, [password])

    return (
        <div className='signup-all'>

            <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
                {/* Sign Up Form */}
                <div className={`form-container sign-up-container ${isSignUpActive ? 'overlay-right' : 'overlay-left'}`}>
                    <form action="#">
                        <h2>Create Account</h2>
                        <div className="social-container">
                            <Link to={""}>
                                <FiInstagram />
                            </Link>
                            <Link>
                                <FiMail />
                            </Link>
                            <Link>
                                <FiGithub />
                            </Link>

                        </div>
                        <span>Connect us!</span>
                        <input className='signup-input' type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
                        <input className='signup-input' type="email" placeholder="Email" onChange={(e) => { setMail(e.target.value) }} />
                        <input className='signup-input' type="text" placeholder="Profession" onChange={(e) => { setProfession(e.target.value) }} />
                        <input className='signup-input' type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                        <button className='sign-btn' onClick={handleSignup}>Sign Up</button>
                        <div className='spinner'>
                            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                                {spin && (
                                    <CircularProgress color="secondary" style={{ color: "#FF4A2C" }} />
                                )}
                            </Stack>
                        </div>

                        <div className="error-message">
                            <p>{errMessage}</p>
                        </div>
                    </form>

                </div>

                {/* Sign In Form */}
                <div className={`form-container sign-in-container ${isSignUpActive ? 'overlay-left' : 'overlay-right'}`}>
                    <form action="#">
                        <h2>Sign In</h2>
                        <div className="social-container">
                            <Link to={""}>
                                <FiInstagram />
                            </Link>
                            <Link>
                                <FiMail />
                            </Link>
                            <Link>
                                <FiGithub />
                            </Link>
                        </div>
                        <span>connect us</span>
                        <input className='signup-input' type="email" placeholder="Email" onChange={(e) => { setMail(e.target.value) }} />
                        <input className='signup-input' type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                        <button className='sign-btn' onClick={handleLogin}>Sign In</button>
                        <div className='spinner'>
                            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                                {spin && (
                                    <CircularProgress color="secondary" style={{ color: "#FF4A2C" }} />
                                )}
                            </Stack>
                        </div>
                        <div className="error-message">
                            <p>{errMessage}</p>
                        </div>
                    </form>
                </div>

                {/* Overlay */}
                <div className={`overlay-container ${isSignUpActive ? 'overlay-right' : 'overlay-left'}`}>
                    <div className="overlay">
                        {/* Left overlay panel */}
                        <div className="overlay-panel overlay-left">
                            <h2>Connect Back</h2>
                            <p>To keep connected with us please login to your Account</p>
                            <button className='change-btn' id="signIn" onClick={() => { setIsSignUpActive(false) }}>Sign In</button>
                        </div>

                        {/* Right overlay panel */}
                        <div className="overlay-panel overlay-right">
                            <h2>Welcome Buddy</h2>
                            <p>Track Your Expenses Meet Your Dream</p>
                            <button className='change-btn' id="signUp" onClick={() => { setIsSignUpActive(true) }}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default SlideFormComponent;


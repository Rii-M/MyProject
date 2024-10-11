import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({ nesetShowLogin }) => {
    const [currState, setCurrState] = useState("Log In")
    return (
        <div className='login-popup'>
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => nesetShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" ? <input type="text" placeholder='Your name' required /> : <></>}
                    <input type="email" placeholder='Your Email' required />
                    <input type="password" placeholder='Password' required />
                </div>
                <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required /> <p>I agree to terms and conditions.</p>
                </div>

                {currState === "Sign Up" ? <p>Already have an account?<span onClick={() => setCurrState("Log In")}>Login</span></p>
                    : <p>Create a new account?<span onClick={() => setCurrState("Sign Up")}>CLick here</span></p>
                }


            </form>
        </div>
    )
}

export default LoginPopup

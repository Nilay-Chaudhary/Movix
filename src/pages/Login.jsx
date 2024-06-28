import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch("https://movix-now.vercel.app/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (!json.success) {
            alert("Enter Valid Credentials");
        }

        if (json.success) {
            localStorage.setItem("authToken", json.authToken);
            localStorage.setItem("userEmail", credentials.email);
            window.scrollTo(0, 0);
            navigate("/");
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            <div className="bg-gray-900 outline outline-white rounded-lg px-8 py-6 w-[40%] max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4 text-gray-300">Welcome Back!</h1>
                <hr />
                <form onSubmit={submitHandler}>
                    <div className="mb-5 mt-5 text-gray-400 text-center">
                        Enter Your Email and Password to Login
                    </div>
                    <div className="mb-5 mt-5">
                        <input type="email" onChange={onChange} name="email" value={credentials.email} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300" placeholder="Email"/>
                    </div>
                    <div className="mb-5 mt-5">
                        <input type="password" onChange={onChange} name="password" value={credentials.password} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300" placeholder="Password"/>
                    </div>
                    <div className="flex items-center justify-center mb-4 mt-4">
                        <Link to="/signup" className="text-[15px] text-indigo-500 hover:text-indigo-700">New here? Create Account</Link>
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 hover:outline-1 hover:outline-white hover:outline rounded-md text-sm font-medium text-white bg-indigo-600">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
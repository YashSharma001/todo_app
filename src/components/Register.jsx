import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { Context, server } from '../index'
import toast from 'react-hot-toast'

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)

    const submitHandler = async (e) => {
        e.preventDefault();  //after submit page refresh nhi hota 
        setLoading(true)
        try {
            const { data } = await axios.post(`${server}/users/new`, {
                name, email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }
            )
            toast.success(data.message)
            setIsAuthenticated(true)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setIsAuthenticated(false)
            setLoading(false)
        }

    };

    if (isAuthenticated) return <Navigate to={"/"} />


    return (
        <div className='container mt-2'>
            <h2>Create an account to use ToDo App</h2>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={name} onChange={(e) => setName(e.target.value)} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} minLength={5} required />
                </div>

                <button disabled={loading} type="submit" className="btn btn-primary">Sign Up</button>
                <h4>Or</h4>
                <Link className={`nav-link active`} to="/login">Login</Link>
            </form>
        </div>
    )
}

export default Register

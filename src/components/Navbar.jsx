import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../index'
import toast from 'react-hot-toast'
import axios from 'axios'

const Navbar = () => {

    const {isAuthenticated,setIsAuthenticated,loading, setLoading}=useContext(Context)

    const logoutHandler = async (e) => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${server}/users/logout`,
             {
                withCredentials: true,
            }
            )
            toast.success(data.message)
            setIsAuthenticated(false)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setIsAuthenticated(true)
            setLoading(false)
        }

    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">ToDo App</Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link active `} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link active`} href="/profile">Profile</a>
                        </li>
                    </ul>
                    {
                        isAuthenticated?(<button disabled={loading} onClick={logoutHandler} className="btn btn-primary">Logout</button>):
                        (<Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>)
                    }
                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar

import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'

const Header = ({ toggleDarkMode, isDarkMode }) => {
    const [auth, setAuth] = useAuth()

    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ""
        })
        toast.success("Logout Successful", {
            duration: 5000
        })
        localStorage.removeItem("auth")

    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Online Library</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register">Register</NavLink>
                                    </li></>) : (<>

                                        <li className="nav-item dropdown">
                                            <NavLink
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                style={{ border: "none" }}
                                            >
                                                {auth?.user?.name}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <NavLink
                                                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                                                            }`}
                                                        className="dropdown-item"
                                                    >
                                                        Dashboard
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        onClick={handleLogout}
                                                        to="/login"
                                                        className="dropdown-item"
                                                    >
                                                        LogOut
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                    </>)
                            }
                            <li className="nav-item">

                            </li>
                        </ul>
                        {/* <button className="toggle-button" onClick={toggleDarkMode}>
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </button> */}
                        <div>
                            <div>
                                <input className='dark-btn' onClick={toggleDarkMode} type="checkbox" id="dark-mode"/>
                                    <label for="dark-mode"></label>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
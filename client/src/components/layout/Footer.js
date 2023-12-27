import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="footer" style={{color:'white'}}>
                <h1 className="text-center">&copy; 2023 Library Management System</h1>
                <p className="text-center mt-3">
                    <a href="/about">About</a>|<a href="/contact">Contact</a>|
                    <a href="/policy">Privacy Policy</a>
                </p>
            </div>
        </>
    )
}

export default Footer
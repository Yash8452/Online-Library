import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast';
const Layout = (props) => {

    const storedDarkMode = localStorage.getItem('isDarkMode');
    const [isDarkMode, setIsDarkMode] = useState(storedDarkMode ? JSON.parse(storedDarkMode) : false);

    const toggleDarkMode = () => {
        const updatedMode = !isDarkMode;
        setIsDarkMode(updatedMode);
        localStorage.setItem('isDarkMode', JSON.stringify(updatedMode));

    };

    return (
        <>
            <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
                <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
                <main style={{ minHeight: "70vh" }}>{props.children}</main>
                <Toaster />
                <Footer />
            </div>
        </>
    )
}

export default Layout
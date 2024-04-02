import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'

const Landing = () => {
    return (
        <div>
            <nav>
                <div className="logo">Logo</div>
                <div className="login-signup">Login/Signup</div>
            </nav>

            <div className="site-introduction">
                <h1>Welcome to CinePlay!</h1>
                <p>Introduction of the site here...</p>
            </div>

            <div className="sections">
                <div className="movies-section">
                    <Link to="/movies">Movies</Link>
                </div>
                <div className="games-section">
                    <Link to="/games">Games</Link>
                </div>
            </div>
        </div>
    );
};

export default Landing;

import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import Logo from "../../assets/logo1.png";
import Login from "../../assets/login.png";

const Landing = () => {
  return (
    <div className="landing">
      <nav>
        <img className="logo" src={Logo} alt="Cineplay-logo" />
        <button className="custom-btn btn-11 ">
          <div style={{ display: "flex" }}>
            <img className="login-img" src={Login} alt="Login-img" />
            <p>Login/Signup</p>
          </div>
        </button>
      </nav>

      <div className="site-introduction">
        <h1>Welcome to CinePlay!</h1>
        <p>
          My capstone project is a movie and game exploration website called
          CinePlay. It allows users to explore and discover movies and games,
          with options to add them to their watchlist. The goal of the website
          is to provide users with a fun and enjoyable experience while
          exploring the world of movies and games.
        </p>
      </div>

      <div className="sections">
        <div className="movies-section">
          <Link to="/movies" class="section-link">
            <div className="overlay">Movies</div>
          </Link>
        </div>
        <div className="games-section">
          <Link to="/games" class="section-link">
            <div className="overlay">Games</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;

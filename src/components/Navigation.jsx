import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navigation(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" aria-label="Fifth navbar example">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {/* <img src="" alt='netflix' className='header-logo'/> */}
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="navbarsExample05">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/browse/tv">Tv</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/browse/movie">Movie</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/browsebygenre">Browse By Genre</Link>
              </li>

            </ul>
            <form role="search">
              <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
            </form>
          </div>
        </div>
      </nav>
    );
}

export default Navigation;
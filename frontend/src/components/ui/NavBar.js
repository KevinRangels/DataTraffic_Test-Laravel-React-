import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css';

export const NavBar = () => {
    return (
        <div className="navbar">
          <ul>
            <li>
              <NavLink 
                activeClassName="navbar__active"
                className="navbar__link" 
                exact
                to="/"
              >
                <i class="fas fa-house-user"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                activeClassName="navbar__active"
                className="navbar__link" 
                exact
                to="/characters"
              >
                <i class="fas fa-grin"></i>
                <span>Characters</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                activeClassName="navbar__active"
                className="navbar__link" 
                exact
                to="/locations"
              >
                <i class="fas fa-map-marker-alt"></i>
                <span>Locations</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                activeClassName="navbar__active"
                className="navbar__link" 
                exact
                to="/episodes"
              >
                <i class="fas fa-eye"></i>
                <span>Episodes</span>
              </NavLink>
            </li>
          </ul>
        </div>
    )
}

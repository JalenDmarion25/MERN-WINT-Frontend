import React from 'react'
import '../styles/navbar.css';
import MoonIcon from '../assets/moon-icon.svg'
import SunIcon from '../assets/sun-icon.svg'


export const navbar = ({ handleChange, isChecked }) => {
  return (
    <section className="header">
      <div className="container">
        <h1>Where in the world?</h1>
      </div>

      <div className="toggle-container" >
        <input
          type="checkbox"
          id="check"
          className="toggle"
          onChange={handleChange}
          checked={isChecked}
        />
        <label htmlFor="check">
          {isChecked ? (
            <>
              <img src={MoonIcon} alt="DarkModeIcon" /> Dark Mode
            </>
          ) : (
            <>
              <img src={SunIcon} alt="LightModeIcon" /> Light Mode
            </>
          )}
        </label>      </div>
    </section>
  );
}

export default navbar
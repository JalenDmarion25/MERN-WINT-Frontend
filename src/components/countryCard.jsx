import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/countryCard.css';

const countryCard = ({ country }) => {

  const formattedPopulation = country.population.toLocaleString();


  return (
    <Link className='card-container' to={`/countryDetail/${country.alpha3Code}`}>
        <img src={country.flag} alt={`${country.name} flag`} />
      <span className='country-name'>{country.name}</span>
      <span className='country-population'>
        <span className='titles'>Population:</span> {formattedPopulation}
      </span>      <span className='region'><span className='titles'>Region:</span> {country.region}</span>
      <span className='capital'><span className='titles'>Capital: </span>{country.capital}</span>
    </Link>
  )
}

export default countryCard
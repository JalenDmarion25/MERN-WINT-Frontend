import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LeftArrow from '../assets/arrow-left-solid.svg'



const CountryDetail = () => {
  const { code } = useParams();


  const [country, setCountry] = useState(null);
  const [currencyCode, setCurrencyCode] = useState('');
  const [borderCountries, setBorderCountries] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    if (code) {
      const fetchData = async () => {
        try {
          // Fetch country details
          const response = await fetch(`https://mern-wint.vercel.app/api/country/details/${code}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setCountry(data);
          

          if (data.languages && data.languages.length > 0) {
            const languageNames = data.languages.map(language => language.name);
            setLanguages(languageNames);
          }

          // Extract the currency code
          if (data.currencies && data.currencies.length > 0) {
            setCurrencyCode(data.currencies[0].code);
          }

          // Fetch border countries
          if (data.borders && data.borders.length > 0) {
            const borderPromises = data.borders.map(borderCode =>
              fetch(`https://mern-wint.vercel.app/api/country/border/${borderCode}`).then(res => res.json())
            );
            const borderData = await Promise.all(borderPromises);
            setBorderCountries(borderData);
          }
        } catch (error) {
          console.error('There was a problem fetching the data:', error);
        }
      };
      fetchData();
    }
  }, [code]);

  return (
    <section className='country-details'>
      {country ? (
        <div className='details-container'>
          <div className="flag-container">
          <Link className='back-btn' to="/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>Back</Link>
          <img src={country.flag} alt={`${country.name} flag`} />
          </div>
          <div className="info-container">
          <h2>{country.name}</h2>
          <div className="main-info-container">
          <div className="row-one">
          <p>Native Name: {country.nativeName}</p>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Region: {country.region}</p>
          <p>Sub Region: {country.subregion}</p>
          <p>Capital: {country.capital}</p>
          </div>
          <div className="row-two">
          <p>Top Level Domain: {country.topLevelDomain}</p>
          <p>Currencies: {currencyCode}</p>
          <p>Languages: {languages.join(', ')}</p>
          </div>
          </div>

          <div className="border-country-container">
            <div className="border-title">
            <span>Border Countries: </span>
            </div>
          <div className="border-countries">
          {borderCountries.map((borderCountry, index) => (
            <Link className='border-links' to={`/countryDetail/${borderCountry.alpha3Code}`} key={index}>
              <span>{borderCountry.name}</span>
            </Link>
          ))}
          </div>
          </div>

          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default CountryDetail;
import React, {useState, useEffect} from 'react';
import LazyCountryCard from '../components/LazyCountryCard';


const Home = () => {
  const [countries, setCountries] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');




  useEffect(() => {
      async function fetchData() {
          try {
            const response = await fetch('https://mern-wint.vercel.app/api/country');
            if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setCountries(data);
          } catch (error) {
              console.error('There was a problem fetching the data:', error);
          }
      }
      fetchData();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setDropdownVisible(false);
  };

  const filteredCountries = countries
    .filter(country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(country =>
      selectedRegion ? country.region === selectedRegion : true
    );


  
  return (
    <main className="main-container">
      <section className="search-filter">
        <div className="search-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="black"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
          <input
            type="search"
            name="searchBar"
            id="search-bar"
            placeholder="Search for country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-container" onClick={toggleDropdown}>
          <span className="filter-dropdown">Filter by region</span>

          <div
            className={`dropdown-options ${dropdownVisible ? "visible" : ""}`}
          >
            <div className="menu-option menu-africa" onClick={() => handleRegionSelect('Africa')}>
              <p>Africa</p>
            </div>
            <div className="menu-option menu-america" onClick={() => handleRegionSelect('Americas')}>
              <p>America</p>
            </div>
            <div className="menu-option menu-asia" onClick={() => handleRegionSelect('Asia')}>
              <p>Asia</p>
            </div>
            <div className="menu-option menu-europe" onClick={() => handleRegionSelect('Europe')}>
              <p>Europe</p>
            </div>
            <div className="menu-option menu-oceania" onClick={() => handleRegionSelect('Oceania')}>
              <p>Oceania</p>
            </div>
            <div className="menu-option menu-all" onClick={() => handleRegionSelect('')}>
              <p>All</p>
            </div>
          </div>
        </div>
      </section>

      <section className="countries-container">
        {filteredCountries.map((country, index) => (
          <LazyCountryCard key={index} country={country} />
        ))}
      </section>
    </main>
  );
}

export default Home
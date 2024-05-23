import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useLocalStorage from 'use-local-storage';
import Home from './pages/Home';
import CountryDetail from './pages/countryDetail';
import Navbar from './components/navbar'
// import './styles/navbar'


function App() {

  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Navbar isChecked={isDark} handleChange={() => setIsDark(!isDark)}/>
      <BrowserRouter>
        <div>
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/countryDetail/:code" 
              element={<CountryDetail/>} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

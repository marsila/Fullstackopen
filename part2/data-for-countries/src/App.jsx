import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import SearchForm from "./components/searchForm";
import SearchResult from "./components/searchResult";

function App() {

  const [allCountries, setAllCountries] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const data = response.data;
        setAllCountries(data);
      });
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputSearch(inputValue);
    setSelectedCountry(null);
  };

  const toShow = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(inputSearch.toLowerCase()),
  );
  
  const targetCountry = selectedCountry || (toShow.length===1 ? toShow[0] : null);

  useEffect(() => {
    if (targetCountry) {
      const capital = targetCountry.capital[0];
      const api_key = import.meta.env.VITE_WEATHER_API_KEY;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`,
        )
        .then((response) => setWeather(response.data));
    }else{
      setWeather(null)
    }
  }, [targetCountry]);

  const showCountryDetails = (country) => {
    setSelectedCountry(country);
  };

  return (
    <>
      <h1>Countries App</h1>
      <SearchForm handleInputChange={handleInputChange} />
      <SearchResult
        inputSearch={inputSearch}
        toShow={toShow}
        showCountryDetails={showCountryDetails}
        selectedCountry={selectedCountry}
        targetCountry={targetCountry}
        weather={weather}
      />
    </>
  );
}

export default App;

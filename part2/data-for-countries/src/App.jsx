import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import SearchForm from "./components/searchForm";
import SearchResult from "./components/searchResult";
function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

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
  };

  const toShow = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(inputSearch.toLowerCase()),
  );
  console.log("to show", toShow);

  
  return (
    <>
      <h1>Countries App</h1>
      <SearchForm handleInputChange={handleInputChange} />
      <SearchResult
        inputSearch={inputSearch}
        toShow={toShow}
      />
    </>
  );
}

export default App;

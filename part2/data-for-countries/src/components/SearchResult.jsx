import CountryDetails from "./CountryDetails";

const SearchResult = ({
  inputSearch,
  toShow,
  showCountryDetails,
  selectedCountry,
}) => {
  return (
    <div>
      {inputSearch === "" ? (
        <p>Type a name to search for</p>
      ) : (
        <>
          {selectedCountry ? (
            <CountryDetails country={selectedCountry} />
          ) : toShow.length === 0 ? (
            <p>No match! </p>
          ) : toShow.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : toShow.length === 1 ? (
            <CountryDetails country={toShow[0]} />
          ) : (
            <ul>
              {toShow.map((country) => (
                <li key={country.cca3}>
                  {country.name.common}
                  <button onClick={() => showCountryDetails(country)}>
                    show
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResult;

const CountryDetails = ({ country, weather }) => {
  return (
    <>
      <div className="details">
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="flag" width="150" />
      </div>
      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p>temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </>
  );
};

export default CountryDetails;

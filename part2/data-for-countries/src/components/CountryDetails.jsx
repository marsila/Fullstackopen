const CountryDetails = ({country}) => {
    return(
        <div className="details">
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png} alt="flag" width="150" />
        </div>
    )
}

export default CountryDetails
const CountryInfo = ({ country, weather }) => {
    return (
        <div>
            <h1>{ country.name.common }</h1>
            <p>Capital: { country.capital[0] }</p>
            <p>Area: { country.area }</p>
            <p><b>Languages:</b></p>
            <ul>
                { Object.values(country.languages).map(language => (
                    <li key={language}>{ language }</li>
                )) 
                }
            </ul>
            <img src={ country.flags.png } alt={country.name.common + "flag"}/>
            <h2>Weather in {country.capital[0]}</h2>
            <p>temperature {weather.main.temp - 273} degrees Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <p>wind {weather.speed} m/s</p>
        </div>
    )
}

export default CountryInfo
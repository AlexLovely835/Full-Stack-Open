import {useState, useEffect} from 'react'
import axios from 'axios'

import SearchBar from './Components/SearchBar'
import ChildDisplay from './Components/ChildDisplay'
import CountryInfo from './Components/CountryInfo'

const App = () => {
  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])
  const [isLoading, setLoading] = useState(true)

  const weather_key = process.env.REACT_APP_API_KEY

  const getCountries = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    return request.then(response => response.data)
  }

  const getWeather = (capital) => {
    console.log(capital)
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${weather_key}`)
    return request.then(response => response.data)
  }

  useEffect(() => {
    getCountries().then(countries => {
      setCountries(countries)
    })
  }, [])

  const showCountry = (name) => {
    setNewSearch(name.toLowerCase())
  }

  const shownCountries = countries.filter(country => country.name.common.toLowerCase().includes(newSearch))

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value.toLowerCase())
    getWeather(shownCountries[0].capital[0]).then(weather => {
      setWeather(weather)
      setLoading(false)
    })
    }

  if (shownCountries.length > 10) {
    return (
      <div>
        <SearchBar value={newSearch} onChange={handleSearchChange}/>
        <p>Search too broad; please narrow it down.</p>
      </div>
    )
  } else if (shownCountries.length === 1) {
    if (isLoading) {
      return (
        <div>
          <SearchBar value={newSearch} onChange={handleSearchChange}/>
          <p>Loading data...</p>
        </div>
      )
    } else {
      return (
        <div>
          <SearchBar value={newSearch} onChange={handleSearchChange}/>
          <CountryInfo country={shownCountries[0]} weather={weather} />
        </div>
      )
    }
    
  }
  return (
    <div>
      <SearchBar value={newSearch} onChange={handleSearchChange}/>
      <ChildDisplay children={shownCountries} handleButtonClick={showCountry} />
    </div>
  )
}

export default App;

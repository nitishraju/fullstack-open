import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'

const WeatherInfo = ({capital}) => {
  const [temp, setTemp] = useState(-1)
  const [wind, setWind] = useState(-1)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then((response) => {
        setTemp(response.data.main.temp)
        setWind(response.data.wind.speed)
      })
  }, [capital])

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p><strong>Temperature:</strong> {Math.round(temp)} Celsius</p>
      <p><strong>Wind:</strong> {Math.round(wind)} meters/second</p>
    </div>
  )
}

const CountryInfo = ({countryArr}) => {
  const countryObject = countryArr[0]

  return (
    <div>
      <h1>{countryObject.name}</h1>
      <div>
        <p>Capital: {countryObject.capital}</p>
        <p>Population: {countryObject.population}</p>
      </div>
      <h3>Languages</h3>
      <div>
        <ul>
          {countryObject.languages.map((languageObject) => 
          <li key={languageObject.name}>{languageObject.name}</li>
          )}
        </ul>
      </div>
      <div>
        <img src={countryObject.flag} alt={`${countryObject.name} flag`} width="100" />
      </div>
      <WeatherInfo capital={countryObject.capital} />
    </div>
  )
}

const CountryList = ({countries, search, country, setCountryView}) => {
  if (country) {
    return (
      <div>
        <CountryInfo countryArr={countries.filter((countryObject) => countryObject.name.toUpperCase().includes(country.toUpperCase()))} />
      </div>
    )
  }

  if (countries.length === 1 && search) {
    return (
    <div>
      <CountryInfo countryArr={countries} />
    </div>
    )

  } else
  if (countries.length > 0 && countries.length <= 10 && search) {
    const handleShowClick = (countryObject) => setCountryView(countryObject.name)

    return (
      <div>
        {countries.map((countryObject) => {
          return (
            <div key={countryObject.name}>
              {countryObject.name}
              <button key={countryObject.name} type='button' onClick={() => handleShowClick(countryObject)}>Show</button>
            </div>
          )
        })}
      </div>
    )

  } else
  if (countries.length > 10 && search) {
    return (
      <div>
        <p>Too many matches! Please specify another filter.</p>
      </div>
    )
  }

  return null
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTarget, setSearchTarget] = useState('')
  const [showCountry, setShowCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const searchHandler = (event) => {
    setShowCountry('')
    setSearchTarget(event.target.value)
  }
  const countriesToShow = countries.filter((countryObject) => countryObject.name.toUpperCase().includes(searchTarget.toUpperCase()))

  return (
    <div>
      Find Countries: <input value={searchTarget} onChange={searchHandler} />
      <CountryList countries={countriesToShow} search={searchTarget} country={showCountry} setCountryView={setShowCountry} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
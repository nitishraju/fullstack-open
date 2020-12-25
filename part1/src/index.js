import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'

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
          {countryObject.languages.map((languageObject) => {
            return (
              <li key={languageObject.name} >{languageObject.name}</li>
            )
          })}
        </ul>
      </div>
      <div>
        <img src={countryObject.flag} alt={`${countryObject.name} flag`} width="100" />
      </div>
    </div>
  )
}

const CountryList = ({countries, search}) => {
  if (countries.length === 1 && search) {
    return (
    <div>
      <CountryInfo countryArr={countries} />
    </div>
    )
  } else
  if (countries.length > 0 && countries.length <= 10 && search) {
    return (
      <div>
        {countries.map((countryObject) =>
          <p key={countryObject.name} >{countryObject.name}</p>
        )}
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

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const searchHandler = (event) => setSearchTarget(event.target.value)
  const countriesToShow = countries.filter((countryObject) => countryObject.name.toUpperCase().includes(searchTarget.toUpperCase()))

  return (
    <div>
      Find Countries: <input value={searchTarget} onChange={searchHandler} />
      <CountryList countries={countriesToShow} search={searchTarget} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
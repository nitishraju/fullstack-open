import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'

const CountryList = ({countries, search}) => {
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
      find countries: <input value={searchTarget} onChange={searchHandler} />
      <CountryList countries={countriesToShow} search={searchTarget} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
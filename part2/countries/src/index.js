import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import CountryList from './components/CountryList'

import axios from 'axios'

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
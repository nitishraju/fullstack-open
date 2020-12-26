import React from 'react'
import CountryInfo from './CountryInfo'

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

export default CountryList
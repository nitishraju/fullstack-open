import React from 'react'
import WeatherInfo from './WeatherInfo'

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

export default CountryInfo
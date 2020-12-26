import React, { useState, useEffect } from 'react'

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

export default WeatherInfo
import React, { useState } from 'react'


const WeatherCard = ({ weather, temperature }) => {
  const [isCelsius, setIsCelsius] = useState(false)


  const changeTemperature = () => setIsCelsius(!isCelsius)

  

  return (
    <article className='card'>
      <h1 className='weather_app'>Weather App</h1>
      <h2 className='card_city'>{`${weather?.name}, ${weather?.sys.country}`}</h2>
      <div className='card_data'>
        <section className='card_icon'>
          <img src={weather ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png` : ''} alt="" />

        </section>
        
        <section className='card_description'>
      
          <h3>* {weather?.weather[0].description} *</h3>

          <ul className='card_list'>
            <li><span>Wind Speed</span>{weather?.wind.speed} m/s</li>
            <li><span>Clouds</span>{weather?.clouds.all}%</li>
            <li><span>Presure</span>{weather?.main.pressure}hPa</li>
          </ul>

        </section >
      </div>
      <div className='temperature'>
      <h2 className='temperature_grades'>{isCelsius ? `${temperature?.celsius}°` : `${temperature?.farenheit}°`}</h2>
      <button className='card_button' onClick={changeTemperature}>{isCelsius ? "Change to °F" : "Change to °C "}</button>
      </div>
    </article>
  )
}

export default WeatherCard
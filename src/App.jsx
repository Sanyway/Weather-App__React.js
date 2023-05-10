import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import WeatherCard from './assets/components/WeatherCard'
import Load from './assets/components/Load'



function App() {


  const [coords, setCoords] = useState(0)
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [photo, setPhoto] = useState()
  const [country, setCountry] = useState()


  useEffect(() => {
    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }

      setTimeout(() => {
        setCoords(obj);
      }, 1000);
    }

    navigator.geolocation.getCurrentPosition(success)


  }, [])



  // --------------Petición del clima----------

  useEffect(() => {



    const APIKEY = 'c8de46be3b039637666f35f4c58a0770'
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
    axios.get(URL)
      .then(res => {
        const celsius = Math.round(res.data.main.temp - 273.15)
        const farenheit = Math.round(celsius * 9 / 5 + 32)
        setTemperature({ celsius, farenheit })
        setWeather(res.data)
      })

      .catch(err => console.log(err))

  }, [coords])


  useEffect(() => {
    if (weather) {
      const URL = `https://restcountries.com/v3.1/alpha/${weather.sys.country}`
      axios.get(URL)
        .then(res => {
          setCountry(res.data[0].altSpellings[1])
        })
        .catch(err => console.log(err))
    }

  }, [weather])
  // -----------------cambiar background------------------------------



  useEffect(() => {


    if (country) {
      const URL = `https://api.pexels.com/v1/search?query=Countryside ${country}&page=1&per_page=10`;
      const API_KEY = "n2vWvxtOukYQDvt8MEImh8wHuytLEeypau3daXktHmEt3vJeXAwRxY4l"

      axios.get(URL, {
        headers: {
          Authorization: API_KEY,
    }})
  
      .then((res) => {
        setPhoto({ backgroundImage: `url(${res.data.photos[0].src.landscape})`})
        console.log(res.data.photos[0].src.landscape);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  }, [country]);





return (
  <div className="App" style={photo}>
    {temperature ?
      <WeatherCard weather={weather} temperature={temperature} />
      :
      <Load />
    }
  </div>
)
}

export default App

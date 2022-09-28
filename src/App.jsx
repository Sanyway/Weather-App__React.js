import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import WeatherCard from './assets/components/WeatherCard'
import Load from './assets/components/Load'
import arrow from './assets/images/arrow.png'



function App() {


  const [coords, setCoords] = useState(0)
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [temp, setTemp] = useState()


  useEffect(() => {
    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }

      setCoords(obj)
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

  // -----------------cambiar background------------------------------

  useEffect(() => {

    if (temperature?.celsius < 10) {
      setTemp({ backgroundImage: `url('https://images.unsplash.com/photo-1612208695882-02f2322b7fee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')` })

    } else if (temperature?.celsius > 10 && temperature?.celsius < 30) {
      setTemp({ backgroundImage: `url('https://webneel.com/wallpaper/sites/default/files/images/03-2013/9-mountain-landscape-wallpaper.jpg')` })

    }else if (temperature?.celsius > 30){
      setTemp({ backgroundImage: `url('http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQqR-RNXZoKmlNHfoS6dDOpEjSWU4XlrUURokOZfkULE6KZoIadhOAnJvFngpK_qtY0u9PgwoN-Uvd_ZELV3cU')` })

      
    }

  }, [temperature])







  console.log(temp)


  return (
    <div className="App" style={temp}>
      {temperature ?
      <WeatherCard weather={weather} temperature={temperature} />
      :
      <Load />
    }
    </div>
  )
}

export default App

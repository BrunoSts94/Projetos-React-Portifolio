import { useState, useRef } from 'react'
import axios from 'axios'
import WeatherInformations from './components/WeatherInformations/WeatherInformations'
import Weather5Days from './components/Weather5Days/Weather5Days'

function App() {
  const [weather, setWeather] = useState()
  const [weather5Days, setWeather5Days] = useState()

  const inputReference = useRef()
  


  async function searchCity(){
    const city = inputReference.current.value
    const key = "83af7af09b40caf14cf5629820651c3a"
   
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

    const receiveData = await axios.get(url)
    const info5Days = await axios.get(urlForecast)

    setWeather(receiveData.data)
    setWeather5Days(info5Days.data)
  }

  return (
    <div className='container'>
      <h1>Previsão do Tempo</h1>

      <input ref={inputReference} type="text" placeholder='Digite o nome da cidade'/>
      <button onClick={searchCity}>Buscar</button>
      {weather && <WeatherInformations weather={weather}/>}
      {weather5Days && <Weather5Days weather5Days={weather5Days}/>}
    </div>
  )
}

export default App

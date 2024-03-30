import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'


function App() {
  const [weatherdata, setweatherdata] = useState(null)
  const [location, setlocation] = useState(``)



  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=7&aqi=yes&alerts=yes`)
        setweatherdata(response.data)
        console.log(response)

      } catch (error) {
        console.log(error)
      }
    };
    if (location) {
      fetchdata();
    }
  }, [location])


  const handlelocaitionchange = (event) => {
    setlocation(event.target.value)
  }

  return (
    <>
      <div className='app-container'>
        <h1 className='app-title'>Hava Durumu</h1>
        <div className='input-container'>
          <input
            className='locaition-input'
            type='text'
            placeholder='Sehir Girin'
            value={location}
            onChange={handlelocaitionchange}
          />
        </div>
      </div>
      
      {weatherdata && (
         <div className='weather-container'>
           {weatherdata.forecast.forecastday.map((day) => (
              <div className='day-container' key={day.date}>
                 <h2 className='date'> {day.date} </h2>
                 <img className='weather-icon' src={day.day.condition.icon} alt={day.day.condition.text} />
                 <p className='temp'> {day.day.avgtemp_c} °C </p>
                 <p className='temp'> {day.day.condition.text} </p>
                 <p className='temp'> %{day.day.avghumidity} </p>
              </div>
           ))}
         </div>
      )}
    </>
  )
}

export default App

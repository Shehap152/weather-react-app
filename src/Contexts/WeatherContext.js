import { createContext, useState, useEffect } from "react";
import weatherApi from '../api/weatherApi'

export const WeatherContext = createContext()

const WeatherProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState({
        country: "",
        temp: "",
        minTemp: "",
        maxTemp: "",
        description: "",
        icon: ""
    });
    const [dataState, setDataState] = useState(false);
    useEffect(() => {
        weatherApi.getWeatherByCoords(26.8206, 30.8025)
            .then((res) => {
                setWeatherData({
                    country: res.data.weather[0].main,
                    temp: Math.round(res.data.main.temp - 273.15),
                    minTemp: Math.round(res.data.main.temp_min - 273.15),
                    maxTemp: Math.round(res.data.main.temp_max - 273.15),
                    description: res.data.weather[0].description,
                    icon: `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
                }); setDataState(true)
            })
            .catch((err) => console.log(`Error is : ${err}`))
    }, [])
    return (
        <WeatherContext.Provider value={{ weatherData: weatherData, dataState: dataState, setDataState: setDataState }}>{children}</WeatherContext.Provider>
    )
}

export default WeatherProvider;
import axiosInstance from "./axiosInstance";

const weatherApi = {
    getWeatherByCoords : (lat,lon)=> axiosInstance.get(`/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_KEY}`)
}

export default weatherApi
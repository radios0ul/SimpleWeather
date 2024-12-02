import "./CurrentDayWeather.css";

import humidityIcon from "../../icons/9040274_droplet_icon.png";
import windIcon from "../../icons/9040823_wind_icon.png";
import sunny from "../../icons/9040679_sun_icon.png";
import cloudy from "../../icons/9040113_cloud_icon.png";
import snowy from "../../icons/9040256_cloud_snow_icon.png";
import rainy from "../../icons/9040168_cloud_rain_icon.png";
import sunCloudy from "../../icons/9040153_cloud_sun_icon.png";

function CurrentDayWeather(weatherData) {
  return (
    <div className="current_day_weather">
      <div className="current_day_weather_container">
        <div className="weather_icon">
          {weatherData.weatherData.weather ? (
            weatherData.weatherData.weather[0].main === "Rain" ? (
              <img src={rainy} alt="rainy"></img>
            ) : weatherData.weatherData.weather[0].main === "Clouds" ? (
              <img src={cloudy} alt="cloudy"></img>
            ) : weatherData.weatherData.weather[0].main === "Snow" ? (
              <img src={snowy} alt="snowy"></img>
            ) : weatherData.weatherData.weather[0].main === "Sun" ? (
              <img src={sunny} alt="sunny"></img>
            ) : (
              <img src={sunCloudy}></img>
            )
          ) : null}
        </div>
        <div className="day_temp">
          {weatherData.weatherData.main !== undefined ? (
            <span>
              {Math.round(weatherData.weatherData.main.temp) - 273 > 0 ? (
                <span>+</span>
              ) : null}

              {Math.round(weatherData.weatherData.main.temp) - 273}
            </span>
          ) : (
            <span>??</span>
          )}
          °C
        </div>

        <div className="right_box">
          <div className="night_temp">
            <img src={windIcon} alt="wind" />
            {weatherData.weatherData.main !== undefined ? (
              <span> {Math.round(weatherData.weatherData.wind.speed)}</span>
            ) : (
              <span>??</span>
            )}
            mps
          </div>
          <div className="humidity">
            <img src={humidityIcon} alt="humidity" />
            {weatherData.weatherData.main !== undefined ? (
              <span> {Math.round(weatherData.weatherData.main.humidity)}</span>
            ) : (
              <span>??</span>
            )}
            %
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentDayWeather;

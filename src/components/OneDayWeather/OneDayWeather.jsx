import "./OneDayWeather.css";

import humidityIcon from "../../icons/9040274_droplet_icon.png";
import windIcon from "../../icons/9040823_wind_icon.png";
import sunny from "../../icons/9040679_sun_icon.png";
import cloudy from "../../icons/9040113_cloud_icon.png";
import snowy from "../../icons/9040256_cloud_snow_icon.png";
import rainy from "../../icons/9040168_cloud_rain_icon.png";
import sunCloudy from "../../icons/9040153_cloud_sun_icon.png";

function OneDayWeather(weatherData) {

/*  форматитрование timestamp в дату */

  const d = new Date(weatherData.weatherData.dt * 1000);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekday = weekdays[d.getDay()];
  const currentDate = String(
    weekday +
      " " +
      ("0" + d.getDate()).slice(-2) +
      "." +
      ("0" + (d.getMonth() + 1)).slice(-2)
  );

  return (
    <div className="day-cont day1-container">
      <div className="day-date">{currentDate}</div>

      {/* weather icon */}

      {weatherData.weatherData.weather ? (
        weatherData.weatherData.weather[0].main === "Rain" ? (
          <img className="day-sun" src={rainy} alt="rainy"></img>
        ) : weatherData.weatherData.weather[0].main === "Clouds" ? (
          <img className="day-sun" src={cloudy} alt="cloudy"></img>
        ) : weatherData.weatherData.weather[0].main === "Snow" ? (
          <img className="day-sun" src={snowy} alt="snowy"></img>
        ) : weatherData.weatherData.weather[0].main === "Sun" ? (
          <img className="day-sun" src={sunny} alt="sunny"></img>
        ) : (
          <img className="day-sun" src={sunCloudy}></img>
        )
      ) : (
        <span>??</span>
      )}

      {/* temperature calculation */}

      <div className="day-temp">
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

      {/* wind speed calculation */}

      <div className="day-wind-humi-cont">
        <div className="day-wind-cont">
          <img className="day-wind" src={windIcon} alt="wind" />
          <div className="day-wind-speed">
            {weatherData.weatherData.main !== undefined ? (
              <span> {Math.round(weatherData.weatherData.wind.speed)}</span>
            ) : (
              <span>??</span>
            )}
            mps
          </div>
        </div>

        {/* humidity calculation */}

        <div className="day-humi-cont">
          <img className="day-humidity" src={humidityIcon} alt="humidity" />
          <div className="day-humi-value">
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

export default OneDayWeather;

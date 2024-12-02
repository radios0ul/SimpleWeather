import "./WeatherContainer.css";

import refreshImg from "../../icons/9039822_arrow_repeat_icon.png";

import CurrentDayWeather from "../CurrentDayWeather/CurrentDayWeather";
import FiveDaysWeather from "../FiveDaysWeather/FiveDaysWeather";

function WeatherContainer({ weather, days, onRefreshClick }) {
  function RefreshButtonHandler() {
    onRefreshClick();
  }

  return (
    <div className="weather-container">
      {days ? (
        <CurrentDayWeather weatherData={weather}></CurrentDayWeather>
      ) : (
        <FiveDaysWeather weatherData={weather}></FiveDaysWeather>
      )}
      <button className="refresh-btn" onClick={RefreshButtonHandler}>
        <img src={refreshImg} alt="refresh button" />
      </button>
    </div>
  );
}

export default WeatherContainer;

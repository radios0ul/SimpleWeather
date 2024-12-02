import "./FiveDaysWeather.css";

import OneDayWeather from "../OneDayWeather/OneDayWeather";

function FiveDaysWeather(weatherData) {
  return (
    <>
      {weatherData.weatherData.list ? (
        <div className="five-days-container">
          <OneDayWeather
            weatherData={weatherData.weatherData.list[8]}
          ></OneDayWeather>
          <OneDayWeather
            weatherData={weatherData.weatherData.list[16]}
          ></OneDayWeather>
          <OneDayWeather
            weatherData={weatherData.weatherData.list[24]}
          ></OneDayWeather>
          <OneDayWeather
            weatherData={weatherData.weatherData.list[32]}
          ></OneDayWeather>
          <OneDayWeather
            weatherData={weatherData.weatherData.list[39]}
          ></OneDayWeather>
        </div>
      ) : (
        <div className="error-div">Oops... Something went wrong, maybe the name of the city is not correct. Please try again!</div>
      )}
    </>
  );
}

export default FiveDaysWeather;

import "./App.css";

import { useEffect, useState } from "react";

/*/// default settings ///*/

import { default_weather } from "./components/Config/Config";
import { defaultFiveDaysweather } from "./components/Config/Config";
import { API_KEY } from "./components/Config/Config";
import { defaultUrl } from "./components/Config/Config";
import { defaultFiveDaysUrl } from "./components/Config/Config";

/*/// components ///*/

import LogoHeader from "./components/LogoHeader/LogoHeader";
import GeolocationBox from "./components/GeolocationBox/GeolocationBox";
import WeatherContainer from "./components/WeatherContainer/WeatherContainer";

function App() {

  /*/// local states ///*/

  const [weatherData, setWeatherData] = useState(default_weather);
  const [days, setDays] = useState(true);
  const [cityName, setCityName] = useState(default_weather.name);
  const [url, setUrl] = useState(defaultUrl);
  const [locateMethod, setLocateMethod] = useState("By Default");
  const [coord, setCoord] = useState(null);

  /*/// variables ///*/

  let fiveDaysUrl;

  /*///  event handlers ///*/
  /*  хэндлер кнопки "геолокация" */

  const handleLocationButtonClick = () => {
    getWeatherByLocation();
  };

  /*  хэндлер кнопки "обновить" */

  const handleRefreshButtonClick = () => {
    if (days === false) {
      getFiveDaysForecast();
    } else {
      getWeather(url);
    }
  };

  /*  хэндлер переключателя "текущая погода / прогноз на 5 дней" */

  const handleDaysSwitchClick = () => {
    setDays((prev) => {
      return !prev;
    });
    if (days === true) {
      setWeatherData(defaultFiveDaysweather.weatherData);
      getFiveDaysForecast();
    } else {
      getWeather(url);
    }
  };

  /*  хэндлер кнопки "поиск города" в инпуте */

  const handleSearchButtonClick = (manualCityName) => {
    if (manualCityName) {
      const manualUrl = `https://api.openweathermap.org/data/2.5/weather?q=${manualCityName}&appid=${API_KEY}`;

      setUrl(
        `https://api.openweathermap.org/data/2.5/weather?q=${manualCityName}&appid=${API_KEY}`
      );
      setCityName(manualCityName);
      setLocateMethod("Manual");

      if (days === true) {
        getWeather(manualUrl);

        getCoordsByCityName(manualCityName);
      } else {
        getFiveDaysForecast(manualCityName);
      }
    } else {
      alert("Please enter the city first!");
    }
  };

  /*/// actions ///*/
  /* универсальная функция для запроса погоды */

  async function getWeather(url) {
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch(() => {
        console.log("FETCH ERROR");
        alert("Oops, it seems like something went wrong.. Please try again!");
      });
  }

  /* запрос погоды по геолокации */

  function getWeatherByLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userCoords = { latitude, longitude };

          const urlByLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
          const fiveDaysUrlByLocation = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

          getCityName(userCoords);
          setUrl(urlByLocation);
          setCoord(userCoords);

          if (days == true) {
            getWeather(urlByLocation);
          } else {
            getWeather(fiveDaysUrlByLocation);
          }
        },

        () => {
          alert(
            "Failed to locate.. Please check your browser settings and try again"
          );
        }
      );
    } else {
      console.log("error");
    }
  }

  /* запрос погоды на 5 дней */

  async function getFiveDaysForecast(manualCityName) {
    if (manualCityName) {
      fiveDaysUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${manualCityName}&appid=${API_KEY}`;
      await getWeather(fiveDaysUrl);
    } else {
      if (coord !== null) {
        fiveDaysUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.latitude}&lon=${coord.longitude}&appid=${API_KEY}`;
      } else if (cityName !== null) {
        fiveDaysUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;
      } else {
        fiveDaysUrl = defaultFiveDaysUrl;
      }
      await getWeather(fiveDaysUrl);
    }
  }

  /* запрос названия города по координатам из геолокации */

  async function getCityName({ latitude, longitude }) {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`
    );
    const { city } = await res.json();
    setCityName(city);
    setLocateMethod("By your location");
  }

  /* запрос координат по названию города из инпута */

  async function getCoordsByCityName(name) {
    await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=${API_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const latitude = data[0].lat;
        const longitude = data[0].lon;
        const userCoords = { latitude, longitude };
        setCoord(userCoords);
        return userCoords;
      })
      .catch(() => {
        alert("Oops, it seems like your city does not exist :) ");
        setCityName(default_weather.name);
        setUrl(defaultUrl);

        if (days) {
          getWeather(defaultUrl);
        } else {
          getFiveDaysForecast(defaultFiveDaysUrl);
        }
      });
  }

  /* Начальный запрос погоды при загрузке страницы */

  useEffect(() => {
    getWeather(url);
  }, []);

  /* ///components assembly/// */

  return (
    <div className="app_container">
      <LogoHeader></LogoHeader>
      <GeolocationBox
        city={cityName}
        locationMethod={locateMethod}
        onLocationClick={handleLocationButtonClick}
        onSearchClick={handleSearchButtonClick}
        onDaysClick={handleDaysSwitchClick}
      ></GeolocationBox>
      <WeatherContainer
        weather={weatherData}
        days={days}
        onRefreshClick={handleRefreshButtonClick}
      ></WeatherContainer>
    </div>
  );
}

export default App;

import "./GeolocationBox.css";
import locationIcon from "../../icons/9040376_geo_alt_icon.png";
import searchIcon from "../../icons/9040575_search_icon.png";

function GeolocationBox({
  onLocationClick,
  city,
  locationMethod,
  onSearchClick,
  onDaysClick,
}) {


  /*  хэндлеры кнопок - передают события наверх в App.js */

  function searchButtonHandler(event) {
    event.preventDefault();
    const manualCityName = event.target.elements.city.value;
    onSearchClick(manualCityName);
    event.target.reset();
  }

  function getLocationButtonHandler() {
    onLocationClick();
  }

  function daysHandler() {
    onDaysClick();
  }

  return (
    <div className="location-container">
      <div className="location-box">
        <div className="city-name">{city}</div>
        <form onSubmit={searchButtonHandler}>
          <input
            className="city-input"
            type="text"
            name="city"
            placeholder="Enter your city"
          />
          <button className="search-location-btn">
            <img className="search-img" src={searchIcon} alt="search" />
          </button>
        </form>
        <button
          className="get-location-btn"
          type="submit"
          onClick={getLocationButtonHandler}
        >
          <img
            className="location-img"
            src={locationIcon}
            alt="get location icon"
          />
        </button>
      </div>

      <div className="location-method">{locationMethod}</div>
      <div className="check-box">
        <div className="check-container">
          <div className="one-day">Today</div>

          <label className="switch">
            <input type="checkbox" onClick={daysHandler} />
            <span className="slider round"></span>
          </label>

          <div className="five-days">5 days</div>
        </div>
      </div>
    </div>
  );
}

export default GeolocationBox;

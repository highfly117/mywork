import React from 'react';

import "../CSS/Mob/WeatherCard.css"

const WeatherCard = ({ data }) => {
    return (
      <div style={{ color: "white", backgroundColor: "#39536d", fontSize: "13px", paddingLeft: "0px", paddingRight: "0px" }} className="d-flex flex-column">
        <div className="container" style={{ flexGrow: 1 }}>
          <div className="row">
            <div className="col"><img src={data.current.condition.icon} alt="weather condition"/></div>
            <div style={{ textAlign: "end", paddingRight: "5px" }} className="col">
              <p className="pData">{data.forecast.forecastday[0].day.maxtemp_c}/{data.forecast.forecastday[0].day.mintemp_c}°C</p>
              <strong><p className="pData" style={{ fontSize: "15px" }}>{data.current.temp_c}°C</p></strong>
              <p className="pData">Feels like: {data.current.feelslike_c}°C</p>
              <strong><p className="pData" style={{ color: "gray" }}>{data.current.condition.text}</p></strong>
            </div>
            <div className="w-100"></div>
            <div style={{ textAlign: "left", paddingLeft: "5px" }} className="col">
              <p className="pData"><strong>UV Index: </strong>{data.current.uv}</p>
              <p className="pData"><strong>Humidity:</strong> {data.current.humidity}%</p>
              <p className="pData"><strong>Wind:</strong> {data.current.wind_mph}/{data.current.wind_dir} mph</p>
              <p className="pData"><strong>Precip:</strong> {data.forecast.forecastday[0].day.totalprecip_mm}mm</p>
            </div>
            <div className="col" style={{textAlign: "end",paddingRight: "5px" }}>
              <br></br>
              <br></br>
              <p className="pData"><strong>Sun Rise: </strong>{data.forecast.forecastday[0].astro.sunrise}</p>
              <p className="pData"><strong>Sun Set:</strong> {data.forecast.forecastday[0].astro.sunset}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default WeatherCard;
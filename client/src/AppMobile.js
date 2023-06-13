import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'

import TopBarMob from './Componants/Mob/TopBarMob';
import SideNavMob from './Componants/Mob/SideNavMob'
import WeatherMapMob from "./Componants/Mob/WeatherMapMob";
import DataBar from "./Componants/DataBar";

import './AppMobile.css';

function AppMobile() {
  const [data, setdata] = useState(null)
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });






  useEffect(() => {


    const loadData = async (latitude, longitude) => {
      try {
        console.log(latitude, longitude);
        //const response = await axios.get("http://192.168.0.140:5000/api/v1/getWeather", {params:{latitude:latitude,longitude:longitude}});
        const response = await axios.get("https://express-api-git-master-highfly117.vercel.app/api/v1/getWeather", { params: { latitude: latitude, longitude: longitude } });
        console.log(response.data)
        setdata(response.data);

      } catch (error) {
        console.log(error);
      };
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        loadData(latitude, longitude);
      },
      (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);

        loadData(undefined, undefined);
      }
    );

  }, [])

  return (
    <div className="AppMobile">


      <SideNavMob></SideNavMob>

      {data ? (
        <TopBarMob data={{ locationName: data.location.name, locationCountry: data.location.country, updateData: setdata, updateLocation: setLocation }} className="home_content"></TopBarMob>
      ) : (
        <p>Loading...</p>
      )}
      <div className="row Panels">
        <div className="row" style={{ height: "50vh" }}>
          {data ? (
            <WeatherMapMob location={location}></WeatherMapMob>
          ) : (
            <p>Loading...</p>
          )}

        </div>

        <div style={{ paddingRight: "0px" }} className="row">

          {data ? (

            <div style={{ paddingRight: "0px" }} className="row">

              <div style={{ color: "white", backgroundColor: "#39536d", fontSize: "10px", paddingLeft: "0px", paddingRight: "0px" }}>
                <div class="container">
                  <div class="row">
                    <div class="col"><img src={data.current.condition.icon}></img></div>
                    <div style={{ textAlign: "end", paddingRight: "5px" }} class="col">
                      <a>{data.forecast.forecastday[0].day.maxtemp_c}/{data.forecast.forecastday[0].day.mintemp_c}°C</a><br></br>
                      <strong><a style={{ fontSize: "15px" }}>{data.current.temp_c}°C</a></strong><br></br>
                      <a>Feels like: {data.current.feelslike_c}°C</a><br></br>
                      <strong><a style={{ color: "gray" }}>{data.current.condition.text}</a></strong><br></br>
                    </div>
                    <div class="w-100"></div>
                    <div style={{ textAlign: "left", paddingLeft: "5px" }} class="col">
                      <a><strong>UV Index: </strong>{data.current.uv}</a><br></br>
                      <a><strong>Humidity:</strong> {data.current.humidity}%</a><br></br>
                      <a><strong>Wind:</strong> {data.current.wind_mph}/{data.current.wind_dir} mph</a><br></br>
                      <a><strong>Precip:</strong> {data.forecast.forecastday[0].day.totalprecip_mm}mm</a><br></br>
                    </div>
                    <div class="col" style={{textAlign: "end",paddingRight: "5px" }}>
                    <a></a><br></br>
                    <a></a><br></br>
                      <a><strong>Sun Rise: </strong>{data.forecast.forecastday[0].astro.sunrise}</a><br></br>
                      <a><strong>Sun Set:</strong> {data.forecast.forecastday[0].astro.sunset}</a><br></br>
                      

                    </div>
                  </div>
                </div>

              </div>

            </div>

          ) : (
            <p>Loading...</p>
          )}



        </div>


      </div>





    </div>




  )



}

export default AppMobile;

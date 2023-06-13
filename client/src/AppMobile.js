import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'

import TopBarMob from './Componants/Mob/TopBarMob';
import SideNavMob from './Componants/Mob/SideNavMob'
import WeatherMapMob from "./Componants/Mob/WeatherMapMob";
import DataBar from "./Componants/DataBar";
import WeatherCard from "./Componants/Mob/WeatherCard";
import ForcastCard from "./Componants/Mob/ForcastCard";

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
      async (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);

        try {
          // Replace 'your_api_key' with your actual API key
          const response = await axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAFEPBEgSJFCqgaJsZH6HeyfKdd9IJ-MIc');
          const data = response.data;
          setLocation({ latitude: data.location.lat, longitude: data.location.lng });
          loadData(data.location.lat, data.location.lng);
        } catch (googleApiError) {
          console.error(googleApiError);
          loadData(undefined, undefined);
        }
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
        <div className="row row-5" style={{paddingRight: "0px" }}>
          {data ? (
            <WeatherMapMob location={location}></WeatherMapMob>
          ) : (
            <p>Loading...</p>
          )}

        </div>

          {data ? (

            <div style={{ paddingRight: "0px" }} className="row row-3">

              <WeatherCard data={data} />

            </div>

          ) : (
            <p>Loading...</p>
          )}



       

        <div className="row row-4" style={{}}>

          {data ? (
          <ForcastCard data={data} ></ForcastCard>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
          <ForcastCard data={data} ></ForcastCard>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
          <ForcastCard data={data} ></ForcastCard>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
          <ForcastCard data={data} ></ForcastCard>
          ) : (
            <p>Loading...</p>
          )}


        </div>


      </div>





    </div>




  )



}

export default AppMobile;

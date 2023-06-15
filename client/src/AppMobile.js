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
  const [futureData, setFutureData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Hourly');





  useEffect(() => {




    const loadData = async (latitude, longitude) => {
      try {
        console.log(latitude, longitude);
        //const response = await axios.get("http://192.168.0.140:5000/api/v1/getWeather", { params: { latitude: latitude, longitude: longitude } });
        const response = await axios.get("https://express-api-git-master-highfly117.vercel.app/api/v1/getWeather", { params: { latitude: latitude, longitude: longitude } });
        console.log(response.data)
        setdata(response.data);
        logTime(response.data)
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



    const logTime = (data) => {
      try {
        let currentDate = new Date(); // Get current date and time
        let currentHour = currentDate.getHours(); // Get the current hour
        let hourlyData = data.forecast.forecastday[0].hour; // Access the nested hourly data
        let hourlyDataTomorrow = data.forecast.forecastday[1].hour;
        let newFutureData = []; // This will hold the entries that are after or at the current hour

        console.log(selectedOption)

        if(selectedOption === "3day"){

          
          newFutureData.push(hourlyData[currentHour])

          for (let i = 1; i <= 2; i++){

            newFutureData.push(data.forecast.forecastday[i])

          }
          console.log(newFutureData)
          setFutureData(newFutureData);

        }else{
          if (currentHour > 19) {
          
            for (let i = 0; i < hourlyData.length; i++) {
              let entryDate = new Date(hourlyData[i].time); // Convert the entry time string to a Date object
              let entryHour = entryDate.getHours(); // Get the hour from the entry time
  
              if (entryHour >= currentHour) {
                newFutureData.push(hourlyData[i]); // Add the entry to the futureData array
              }
            }
            
            newFutureData = newFutureData.concat(hourlyDataTomorrow)
            
            setFutureData(newFutureData); // Update the state
          }else{
            for (let i = 0; i < hourlyData.length; i++) {
              let entryDate = new Date(hourlyData[i].time); // Convert the entry time string to a Date object
              let entryHour = entryDate.getHours(); // Get the hour from the entry time
  
              if (entryHour >= currentHour) {
                newFutureData.push(hourlyData[i]); // Add the entry to the futureData array
              }
            }
            setFutureData(newFutureData); // Update the state
  
          }
        }
       
      } catch (error) {
        console.log(error);
      }
    }


  }, [selectedOption])

  return (
    <div className="AppMobile">

      <SideNavMob></SideNavMob>

      {data ? (
        <TopBarMob data={{ locationName: data.location.name, locationCountry: data.location.country, updateData: setdata, updateLocation: setLocation }} className="home_content"></TopBarMob>
      ) : (
        <p>Loading...</p>
      )}

      <div className="row Panels">
        <div className="row row-5" style={{ paddingRight: "0px" }}>
          {data ? (
            <WeatherMapMob location={location} selectedOption={selectedOption} setSelectedOption={setSelectedOption}></WeatherMapMob>
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

        <div className="row row-4 ">
          <div className="d-flex flex-nowrap overflow-auto ForcastCardContainer">
            {futureData.length > 0 ? (
              futureData.map((data, index) =>
                <ForcastCard
                  key={index}
                  data={data}
                  className={index === 0 ? "firstCard" : "nextCard"}
                  flag ={futureData.length === 3 ? "3day":"hourly"}
                />
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>

      </div>





    </div>




  )



}

export default AppMobile;

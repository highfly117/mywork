import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import DataTable from 'datatables.net-dt'
import TopBar from './Componants/TopBar';
import SideNav from './Componants/SideNav'
import Graph from './Componants/Graph'
import WeatherTable from "./Componants/WeatherTable";
import DataBar from "./Componants/DataBar";
import WeatherMap from "./Componants/WeatherMap";


import './App.css';



function App() {

  const [data, setdata] = useState(null)
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [isHour, setHour] = useState(new Date().getHours())


  const tableRef = useRef(null);
  const tableRef2 = useRef(null);

  const isMobileDevice = () => {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  };

  const mobilesettings = () => {

    tableRef.current.classList.remove('col-8')
    tableRef.current.classList.add('col')
    tableRef2.current.classList.remove('col-4')

  }

  //   const PanelStyle = {
  //     left: isMobileDevice() ? '72px' : '252px',
  //     width: isMobileDevice() ? 'calc(100% - 60px)' : 'calc(100% - 240px)'
  // }

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
    <div className="App">

      <SideNav></SideNav>
      {data ? (
        <TopBar data={{ locationName: data.location.name, locationCountry: data.location.country, updateData: setdata, updateLocation: setLocation }} className="home_content"></TopBar>
      ) : (
        <p>Loading...</p>
      )}
      <div className="row Panels">

        <div className="row row-8 mapRow">
          {data ? (
            <WeatherMap location={location}></WeatherMap>
          ) : (
            <p>Loading...</p>
          )}

        </div>

        <div className="row row-1 dataRow"  >
        {data ? (
            <DataBar data={{ DataType: "Temperature", DataValue: data.forecast.forecastday[0].hour[isHour].temp_c + " °C", TypeColor: "orange" }} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
        {data ? (
            <DataBar data={{ DataType: "Feels like", DataValue: data.forecast.forecastday[0].hour[isHour].feelslike_c + " °C", TypeColor: "orange" }} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{ DataType: "Max", DataValue: data.forecast.forecastday[0].day.maxtemp_c + "°C", TypeColor: "orange" }} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{ DataType: "Min", DataValue: data.forecast.forecastday[0].day.mintemp_c + "°C", TypeColor: "lightskyblue" }} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{ DataType: "Humidity", DataValue: data.current.humidity + "%", TypeColor: "brown" }} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{ DataType: "Wind Speed", DataValue: data.current.wind_mph + " mph", TypeColor: "Green" }} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{ DataType: "Wind Direction", DataValue: data.current.wind_dir, TypeColor: "greenyellow" }} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{ DataType: "Gusts", DataValue: data.current.gust_mph + " mph", TypeColor: "lightblue" }} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{ DataType: "Pressure", DataValue: data.current.pressure_mb, TypeColor: "blueviolet" }} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{ DataType: "Rain", DataValue: data.forecast.forecastday[0].day.totalprecip_mm + " mm", TypeColor: "royalblue" }} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}


        </div>
        <div className="row row-3 graphRow">
        {data ? (
          <Graph data={data} className="D3Graphs"></Graph>
        ) : (
          <div></div>
        )}
        </div>
      </div>

      {/* <div ref={tableRef2} className="col-3 infopanel">
          {data ? (
            <WeatherTable data={data}></WeatherTable>
          ) : (
            <p>Loading...</p>
          )}

        </div> */}
    </div>
    
  );
}

export default App;

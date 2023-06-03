import React, { useState, useEffect, useRef } from "react";
import Flow from './Componants/Flow'
import axios from 'axios'
import DataTable from 'datatables.net-dt'
import TopBar from './Componants/TopBar';
import SideNav from './Componants/SideNav'
import Graph from './Componants/Graph'
import WeatherTable from "./Componants/WeatherTable";
import DataBar from "./Componants/DataBar";


import './App.css';



function App() {

  const [data, setdata] = useState(null)
  const [timedata, settimedata] = useState([])
  const [weatherData, SetWeather] = useState(null)
 
 
  const tableName = "table1"

  useEffect(() => {

      const loadData = async () => { 
        try{
          //const response = await axios.get("http://localhost:5000/api/v1/getWeather")
          const response = await axios.get("https://express-api-highfly117.vercel.app/api/v1/getWeather")
          setdata(response.data)
          
          } catch(error) {
          console.log(error)
        };
      };

      loadData();
      console.log(data)

  }, [])

  


  return (
    <div className="App">

      <SideNav ></SideNav>
      <TopBar className="home_content"></TopBar>

      <div className="row Panels">
        <div className="col-8 jsonPanel" >
          <div className="row" style={{marginLeft: "0px", marginRight: "0px"}} > 
          {data ? (
            <DataBar data={{DataType:"Max", DataValue:data.forecast.forecastday[0].day.maxtemp_c  + " °C"}} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{DataType:"Min", DataValue:data.forecast.forecastday[0].day.mintemp_c + " °C"}} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{DataType:"Humidity", DataValue:data.current.humidity}} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{DataType:"Wind Speed", DataValue:data.current.wind_mph + " MPH"}} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{DataType:"Wind Speed Direction", DataValue:data.current.wind_dir}} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{DataType:"Gusts", DataValue:data.current.gust_mph + " MPH"}} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{DataType:"Pressure", DataValue:data.current.pressure_mb + " mb"}} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{DataType:"Rain", DataValue:data.forecast.forecastday[0].day.totalprecip_mm + " mm"}} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          
          
          </div>
        
        {data ? (
        <Graph data={data} className="D3Graphs"></Graph>
      ) : (
        <p>Loading...</p>
      )} 
        </div>
        
        <div className="col-4 infopanel">
        {data ? (
        <WeatherTable data={data}></WeatherTable>
      ) : (
        <p>Loading...</p>
      )} 
          
        </div>
      </div>
    </div>
  );
}

export default App;

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
          const response = await axios.post("http://localhost:9000/getWeather")
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
            <DataBar data={{DataType:"Humidity", DataValue:data.current.humidity}} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{DataType:"Wind Speed (MPH)", DataValue:data.current.wind_mph}} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{DataType:"Wind Speed Direction", DataValue:data.current.wind_dir}} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{DataType:"Gusts (MPH)", DataValue:data.current.gust_mph}} className="col-sm"></DataBar>
          ) : (
            <p>Loading...</p>
          )}
          {data ? (
            <DataBar data={{DataType:"Pressure (mbar)", DataValue:data.current.pressure_mb}} className="col-sm"></DataBar>
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


import React, { useState, useEffect, useRef } from "react";
import DataTable from 'datatables.net-dt'
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "./CSS/WeatherMap.css"
import $ from 'jquery'


const WeatherTable = (data) => {

    useEffect(() => {

        // console.log(data)

        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

      let tableheight = ""

        if (vh <= 929) {tableheight = "730px"} 
        else if (vh <= 1289) {tableheight = "1131px"}
        else if (vh <= 1289) {tableheight = "1131px"}
        else if (vh <= 1449) {tableheight = "1284px"}

        const table = $(`#table1`).DataTable(
            {
              data: data.data.forecast.forecastday[0].hour,
              columns: [
                {
                  data: "time",
                  render: function (data) {
                    var time = data.split(" ")[1];
                    return time;
                  }
                },
                { data: "temp_c" },
                { data: "feelslike_c" },
                { data: "chance_of_rain" },
                { data: "precip_mm"},
                { data: "condition.text" },
                
                  {data: "condition.icon",
                  "render": function (data) {
    
                    return '<img src="' + data + '">'
                  }
                }
              ],
              scrollY: tableheight,
              paging: false,
              destroy: true,  // I think some clean up is happening here
              searching: false,
              info:false,
              ordering:false
            }
          )

    })

    return (
  
      <div className="WeatherTable">
            <table className="display" width="100%" id={"table1"}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Temp (C)</th>
                <th>Feels Like (C)</th>
                <th>Rain %</th>
                <th>Rain (mm)</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
  
      </div>
    );
  }

export default WeatherTable

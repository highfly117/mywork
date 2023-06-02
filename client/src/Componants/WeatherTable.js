
import React, { useState, useEffect, useRef } from "react";
import DataTable from 'datatables.net-dt'
import "datatables.net-dt/css/jquery.dataTables.min.css";

import $ from 'jquery'


const WeatherTable = (data) => {

    useEffect(() => {

        // console.log(data)

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
                { data: "temp_f." },
                { data: "feelslike_f" },
                { data: "condition.text" },
                {
                  data: "condition.icon",
                  "render": function (data) {
    
                    return '<img src="' + data + '">'
                  }
                }
              ],
              scrollY: "1284px",
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
                <th>Temp (F)</th>
                <th>Feels Like (F)</th>
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

import React, { useState, useEffect, useRef } from "react";
import "./CSS/DataBar.css"


const DataBar = (data) => {

    console.log(data.data.DataType)
    console.log(data.data.DataValue)

return (

    <div className="col-sm DataBar">
        <h2>{data.data.DataType}</h2>
        <div className="weather_data_value">{data.data.DataValue}</div><p></p>
    </div>
)

}

export default DataBar;
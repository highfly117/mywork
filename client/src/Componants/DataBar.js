import React, { useState, useEffect, useRef } from "react";
import "./CSS/DataBar.css"
import { color } from "d3";


const DataBar = (data) => {

    // console.log(data.data.DataType)
    // console.log(data.data.DataValue)


    const DatabarRef = useRef(null);

    

    const isMobileDevice = () => {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };

    const DataBarStyle = {
        width: isMobileDevice() ? '79px' : '100%',
        margin: isMobileDevice() ? '10px 2px 0px 2px' : '10px 10px 0px 10px',
        height: isMobileDevice() ? '94px' : '130px'
    }

    const h2Style = {
        "fontSize": isMobileDevice() ? '0.9rem' : '1.25rem',
        "min-height": isMobileDevice() ? '35px':'48px',
        "color":data.data.TypeColor
    }
    const DataStyle = {
        "fontSize": isMobileDevice() ? '0.9rem' : '2rem',
        "min-width": isMobileDevice() ? '60px' : 'none'
    }

    isMobileDevice();

    return (

        <div style={DataBarStyle} className="col-sm DataBar">
            <h2 style={h2Style}>{data.data.DataType}</h2>
            <div style={DataStyle} className="weather_data_value">{data.data.DataValue}</div><p></p>
        </div>
    )

}

export default DataBar;
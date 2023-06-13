import React from 'react';
import "../CSS/Mob/ForcastCardMob.css"


const ForcastCard = ({ data }) => {
    return (
        <div className="card col">
            <img src={data.current.condition.icon} style={{ width: "64px", height: "64px", borderRadius:"0px"}} className="card-img-top" alt="Weather icon"/>
            <div className="card-body">
                <h5 className="card-title">16:00</h5>
                <p style={{fontSize:"20px"}} className="card-text"><strong>{data.forecast.forecastday[0].hour[16].temp_c}°C</strong></p>
                <p className="card-text">Feels:  {data.current.feelslike_c}°C</p>
                <p className="card-text">Hum: {data.current.humidity}%</p>
                <p className="card-text">Precip: {data.forecast.forecastday[0].day.totalprecip_mm}mm</p>
            </div>
        </div>
    );
}

export default ForcastCard;
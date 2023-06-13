import React from 'react';
import "../CSS/Mob/ForcastCardMob.css"


const ForcastCard = ({ data, className }) => {

    console.log(data)
    return (
        <div className={className + " card col"}>
            <img src={data.condition.icon} style={{ width: "64px", height: "64px", borderRadius:"0px"}} className="card-img-top" alt="Weather icon"/>
            <div className="card-body">
                <h5 className="card-title">{data.time.split(" ")[1]}</h5>
                <p style={{fontSize:"20px"}} className="card-text"><strong>{data.temp_c}°C</strong></p>
                <p className="card-text">Feels:  {data.feelslike_c}°C</p>
                <p className="card-text">Hum: {data.humidity}%</p>
                <p className="card-text">Precip: {data.precip_mm}mm</p>
            </div>
        </div>
    );
}

export default ForcastCard;
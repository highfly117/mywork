import React from 'react';

const ForcastCard = ({ data }) => {
    return (
        <div className="card" style={{ width: "25%", borderRadius: "0px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={data.current.condition.icon} style={{ width: "50px", height: "50px", borderBottom:"solid 1px lightgrey", borderRadius:"0px"}} className="card-img-top" alt="Weather icon"/>
            <div className="card-body" style={{fontSize:"12px"}}>
                <h5 className="card-title">16:00</h5>
                <p style={{fontSize:"20px"}} className="card-text"><strong>{data.forecast.forecastday[0].hour[16].temp_c}°C</strong></p>
                <p className="card-text">Feels like:  {data.current.feelslike_c}°C</p>
                <p className="card-text">Humidity: {data.current.humidity}%</p>
                <p className="card-text">Precip: {data.forecast.forecastday[0].day.totalprecip_mm}mm</p>
            </div>
        </div>
    );
}

export default ForcastCard;
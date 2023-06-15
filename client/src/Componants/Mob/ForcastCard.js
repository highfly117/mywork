import React from 'react';
import "../CSS/Mob/ForcastCardMob.css"


const ForcastCard = ({ data, className, flag }) => {

    const isToday = (date) => {
        let today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to midnight

        const comparisonDate = new Date(date);
        comparisonDate.setHours(0, 0, 0, 0); // Normalize to midnight

        if(+today === +comparisonDate) {
            
            
            return "Today";
        } else {
            const dayOfWeek = new Date(date).getDay();
            return isNaN(dayOfWeek) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'][dayOfWeek];
        }
    }

    

    if(flag === "hourly" || className === "firstCard"){

        return (
            <div className={className + " card col"}>
                <h5 className="card-title">{className === "firstCard" && flag === "3day" ? isToday(data.time)  : data.time.split(" ")[1] }</h5>
                
                <div className="card-body">
                <img src={data.condition.icon} style={{ width: "64px", height: "64px", borderRadius:"0px"}} className="card-img-top" alt="Weather icon"/>
                    <p style={{fontSize:"20px"}} className="card-text"><strong>{data.temp_c}°C</strong></p>
                    <p className="card-text">Feels:  {data.feelslike_c}°C</p>
                    <p className="card-text">Hum: {data.humidity}%</p>
                    <p className="card-text">Precip: {data.precip_mm}mm</p>
                </div>
            </div>
        );
    }else if(flag === "3day"){
        return(
        <div className={className + " card col"}>
                <h5 className="card-title">{isToday(data.date)}</h5>
                
                <div className="card-body">
                <img src={data.day.condition.icon} style={{ width: "64px", height: "64px", borderRadius:"0px"}} className="card-img-top" alt="Weather icon"/>
                    <p style={{fontSize:"20px"}} className="card-text"><strong>{data.day.avgtemp_c}°C</strong></p>
                    <p className="card-text">{data.day.maxtemp_c}/{data.day.mintemp_c}</p>
                    <p className="card-text">Hum: {data.day.avghumidity}%</p>
                    <p className="card-text">Precip: {data.day.totalprecip_mm}mm</p>
                </div>
            </div>
        );
    }
    
    
}

export default ForcastCard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "../CSS/Sports/Finals.css"
const Finals = () => {

    const [FinalsData, setFinalsData] = useState(null);

    const teamToCountryCode = {
        'New Zealand': 'nz',
        'France': 'fr',
        'Italy': 'it',
        'Uruguay': 'uy',
        'Namibia': 'na',
        'South Africa': 'za',
        'Ireland': 'ie',
        'Scotland': 'gb-sct',
        'Tonga': 'to',
        'Romania': 'ro',
        'Wales': 'gb-wls',
        'Australia': 'au',
        'Fiji': 'fj',
        'Georgia': 'ge',
        'Portugal': 'pt',
        'England': 'gb-eng',
        'Japan': 'jp',
        'Argentina': 'ar',
        'Samoa': 'ws',
        'Chile': 'cl',
    };

    useEffect(() => {
        const fetchQuarterData = async () => {
            try {
                //const response = await axios.get('http://localhost:5000/api/v1/matches');
                const response = await axios.get(`https://express-api-git-master-highfly117.vercel.app/api/v1/matches`)
                setFinalsData(response.data.matches.final);
                console.log(response.data);
            }
            catch (error) {
                console.error(error);
            }
        };

        fetchQuarterData();
    }, []);

    const getOrdinalSuffix = (day) => {
        if (day === 1 || day === 21 || day === 31) {
            return "st";
        } else if (day === 2 || day === 22) {
            return "nd";
        } else if (day === 3 || day === 23) {
            return "rd";
        } else {
            return "th";
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "short" });
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
        return formattedDate;
    };

    const getTimeFromDateStr = (dateStr) => {
        const date = new Date(dateStr);
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    const getMatchDetails = (matchData) => {
        let team1Name = null;
        let team2Name = null;
        let team1 = null;
        let team2 = null;
    
        Object.entries(matchData).forEach(([key, value]) => {
            if (key.startsWith("WinnerS")) {
                if (!team1Name) {
                    team1Name = key;
                    team1 = value;
                } else {
                    team2Name = key;
                    team2 = value;
                }
            }
        });
    
        return { team1Name, team2Name, team1, team2 };
    }

    return (
        <div className="Final">
            <h2 className='stageName'>Finals</h2>
            {FinalsData && Object.entries(FinalsData).map(([key, value], idx) => {
                const { team1Name, team2Name, team1, team2 } = getMatchDetails(value);
    
                return (
                    <table key={idx} className="tg table-container">
                        <thead>
                            <tr>
                                <th className="tg-0pkt">Date</th>
                                <th className="tg-0pkt">KO</th>
                                <th className="tg-0pkt">{team1Name}</th>
                                <th className="tg-0pkt"></th>
                                <th className="tg-0pkt"></th>
                                <th className="tg-0lax">{team2Name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="tg-0pk1">{formatDate(value.dataTime)}</td>
                                <td className="tg-0pkt">{getTimeFromDateStr(value.dataTime)}</td>
                                <td className="tg-0pk3">
                                    <img src={`https://flagpedia.net/data/flags/normal/${teamToCountryCode[team1]}.png`}
                                         alt={`${team1} flag`}
                                         className="flag-icon" 
                                    /> 
                                    {team1}
                                </td>
                                <td className="tg-0pk4">{value.pts1}</td>
                                <td className="tg-0pk5">{value.pts2}</td>
                                <td className="tg-0pk3">
                                    <img src={`https://flagpedia.net/data/flags/normal/${teamToCountryCode[team2]}.png`}
                                         alt={`${team2} flag`}
                                         className="flag-icon"
                                    /> 
                                    {team2}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                );
            })}
        </div>
    );
};

export default Finals;

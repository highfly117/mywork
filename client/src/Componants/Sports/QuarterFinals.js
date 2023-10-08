import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import { FiEdit2 } from 'react-icons/fi'

import "../CSS/Sports/QuaterFinals.css"

const QuarterFinals = () => {


    const [quarterFinalsData, setQuarterData] = useState(null);

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

    const pastelColors = [
        '#4363d8', '#911eb4',    // sky blue
        '#f58231', '#aaffc3',    // soft pink
        '#E0F9B5', '#FFDAB9',    // thistle
        '#A0CBE8', '#D8BFD8'     // peach puff
    ];

   


    useEffect(() => {
        const fetchQuarterData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL_MATCHDATA}`);
                //const response = await axios.get(`https://express-api-git-master-highfly117.vercel.app/api/v1/matches`)
                setQuarterData(response.data.matches.quarter);
                console.log(response.data);
            }
            catch (error) {
                console.error(error);
            }
        };

        fetchQuarterData();
    }, []);

    const editPoints = (matchKey, teamKey, currentPoints) => {
        const newPoints = prompt(`Edit points for ${teamKey}`, currentPoints);
        if (newPoints) {
            const updatedMatchData = { ...quarterFinalsData[matchKey], [teamKey]: newPoints };
            const updatedData = { updateLocation: 'quarter', [matchKey]: updatedMatchData };
            setQuarterData(prevData => ({ ...prevData, [matchKey]: updatedMatchData }));

            // Send updated data to the server
            axios.put('http://localhost:5000/api/v1/matches/write', updatedData);
        }
    };

    const hidebuttons = (className) => {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(element => {
            if (element.style.display === 'none' || !element.style.display) {
                element.style.display = 'inline-block'; // or 'block' depending on your design needs
            } else {
                element.style.display = 'none';
            }
        });
    }

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
        let winnerName = null;
        let runnerName = null;
        let winner = null;
        let runner = null;

        Object.entries(matchData).forEach(([key, value]) => {
            if (key.startsWith("Winner")) {
                winnerName = key;
                winner = value;
            } else if (key.startsWith("Runner")) {
                runnerName = key;
                runner = value;
            }
        });

        return { winnerName, runnerName, winner, runner };
    }

    return (
        <div className="Quarter">
            <h2 className='stageName'>Quarter Finals</h2>
            {quarterFinalsData && Object.entries(quarterFinalsData).map(([key, value], idx) => {
                const { winnerName, runnerName, winner, runner } = getMatchDetails(value);

                return (
                    <div>
                        <button onClick={() => hidebuttons('editbutton')} style={{ marginLeft: "3px", marginBottom: "3px" }} ><FiEdit2 /></button>
                        <table key={idx} className="tg table-container">
                            <thead>
                                <tr>
                                    <th className="tg-0pkt">Date</th>
                                    <th className="tg-0pkt">KO</th>
                                    <th className="tg-0pkt">{winnerName}
                                        <button className='editbutton' onClick={() => editPoints(key, winnerName, winner)}><FiEdit2 /></button>
                                    </th>
                                    <th className="tg-0pkt">
                                        <button className='editbutton' onClick={() => editPoints(key, 'pts1', value.pts1)}><FiEdit2 /></button>
                                    </th>
                                    <th className="tg-0pkt">
                                        <button className='editbutton' onClick={() => editPoints(key, 'pts2', value.pts2)}><FiEdit2 /></button>
                                    </th>
                                    <th className="tg-0lax">{runnerName}
                                        <button className='editbutton' onClick={() => editPoints(key, runnerName, runner)}><FiEdit2 /></button></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="tg-0pk1">{formatDate(value.dataTime)}</td>
                                    <td className="tg-0pkt">{getTimeFromDateStr(value.dataTime)}</td>
                                    <td className="tg-0pk3" style={{ backgroundColor: pastelColors[idx * 2] }}>
                                        {
                                            winner ?
                                                <img src={`https://flagpedia.net/data/flags/normal/${teamToCountryCode[winner]}.png`}
                                                    alt={`${winner}`}
                                                    className="flag-icon"
                                                />
                                                : winnerName
                                        }
                                        {winner}
                                    </td>
                                    <td className="tg-0pk4">{value.pts1}</td>
                                    <td className="tg-0pk5">{value.pts2}</td>
                                    <td className="tg-0pk3" style={{ backgroundColor: pastelColors[(idx * 2) + 1] }}>
                                        {
                                            runner ?
                                                <img src={`https://flagpedia.net/data/flags/normal/${teamToCountryCode[runner]}.png`}
                                                    alt={`${runner}`}
                                                    className="flag-icon"
                                                />
                                                : runnerName
                                        }
                                        {runner}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
};

export default QuarterFinals;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit2 } from 'react-icons/fi'
import "../CSS/Sports/SemiFinals.css"


const SemiFinals = () => {

    const [semiFinalsData, setSemiFinalsData] = useState(null);

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
                const response = await axios.get(`${process.env.REACT_APP_API_URL_MATCHDATA}`);
                //const response = await axios.get(`https://express-api-git-master-highfly117.vercel.app/api/v1/matches`)
                setSemiFinalsData(response.data.matches.semi);
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
            const updatedMatchData = { ...semiFinalsData[matchKey], [teamKey]: newPoints };
            const updatedData = { updateLocation: 'semi', [matchKey]: updatedMatchData };
            setSemiFinalsData(prevData => ({ ...prevData, [matchKey]: updatedMatchData }));

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
        let team1Name = null;
        let team2Name = null;
        let team1 = null;
        let team2 = null;

        Object.entries(matchData).forEach(([key, value]) => {
            if (key.startsWith("WinnerQ")) {
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
        <div className="Semi">
            <h2 className='stageName'>Semi Finals</h2>
            {semiFinalsData && Object.entries(semiFinalsData).map(([key, value], idx) => {
                const { team1Name, team2Name, team1, team2 } = getMatchDetails(value);

                return (
                    <div>
                        <button onClick={() => hidebuttons('editbutton')} style={{ marginLeft: "3px", marginBottom: "3px" }} ><FiEdit2 /></button>
                        <table key={idx} className="tg table-container">
                            <thead>
                                <tr>
                                    <th className="tg-0pkt">Date</th>
                                    <th className="tg-0pkt">KO</th>
                                    <th className="tg-0pkt">{team1Name}
                                        <button className='editbutton' onClick={() => editPoints(key, team1Name, team1)}><FiEdit2 /></button>
                                    </th>
                                    <th className="tg-0pkt">
                                        <button className='editbutton' onClick={() => editPoints(key, 'pts1', value.pts1)}><FiEdit2 /></button>
                                    </th>
                                    <th className="tg-0pkt">
                                        <button className='editbutton' onClick={() => editPoints(key, 'pts2', value.pts2)}><FiEdit2 /></button>
                                    </th>
                                    <th className="tg-0lax">{team2Name}
                                        <button className='editbutton' onClick={() => editPoints(key, team2Name, team2)}><FiEdit2 /></button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="tg-0pk1">{formatDate(value.dataTime)}</td>
                                    <td className="tg-0pkt">{getTimeFromDateStr(value.dataTime)}</td>
                                    <td className="tg-0pk3">
                                        {
                                            team1 ?
                                                <img src={`https://flagpedia.net/data/flags/normal/${teamToCountryCode[team1]}.png`}
                                                    alt={`${team1}`}
                                                    className="flag-icon"
                                                />
                                                : team1Name
                                        }
                                        {team1}
                                    </td>
                                    <td className="tg-0pk4">{value.pts1}</td>
                                    <td className="tg-0pk5">{value.pts2}</td>
                                    <td className="tg-0pk3">
                                        {
                                            team2 ?
                                                <img src={`https://flagpedia.net/data/flags/normal/${teamToCountryCode[team2]}.png`}
                                                    alt={`${team2}`}
                                                    className="flag-icon"
                                                />
                                                : team2Name
                                        }
                                        {team2}
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

export default SemiFinals;

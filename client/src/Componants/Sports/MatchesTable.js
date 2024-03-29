import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';



const MatchesTable = () => {

    const [allMatches, setallMatches] = useState(null);
    const [userInteracted, setUserInteracted] = useState(false);
    const [showTable, setShowTable] = useState(false); // initially hidden
    const [nextGameIndex, setNextGameIndex] = useState(null);
    const [currentGameIndex, setCurrentGameIndex] = useState(null);


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
        const fetchAllData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL_MATCHDATA}`);
                const groups = response.data.matches.groups;
                const matches = [];
                const matchSet = new Set(); // to keep track of added matches

                for (let groupName in response.data.matches.groups) {
                    let group = response.data.matches.groups[groupName];

                    for (let team in group) {
                        for (let match of group[team]) {
                            // Generate a unique identifier for the match to avoid duplicates
                            const teams = [team, match.opponent].sort();  // Sort the names
                            const matchIdentifier = `${teams[0]}vs${teams[1]}@${match.dataTime}`;

                            if (!matchSet.has(matchIdentifier)) {
                                matchSet.add(matchIdentifier);
                                match.team = team;  // Add the current team to the match object for easier rendering later
                                matches.push(match);
                            }
                        }
                    }
                }

                // Sort the matches by datetime
                matches.sort((a, b) => new Date(a.dataTime).getTime() - new Date(b.dataTime).getTime());

                const currentTime = Date.now();
                const currentIndex = matches.findIndex(match => new Date(match.dataTime).getTime() > currentTime);
                const currentGameIndex = matches.findIndex(match => {
                    const startTime = new Date(match.dataTime).getTime();
                    const endTime = startTime + (2.5 * 60 * 60 * 1000); // 2.5 hours in milliseconds
                    return currentTime >= startTime && currentTime <= endTime;
                });

                setNextGameIndex(currentIndex);
                setCurrentGameIndex(currentGameIndex);

                setallMatches(matches);

            } catch (error) {
                console.error(error);
            }
        };

        fetchAllData();
    }, []);



    return (


        <div className={`matches-table-container ${showTable ? '' : 'hide'}`}>
            <div className="tab" onClick={() => setShowTable(!showTable)}>
                {showTable ? 'Hide' : 'Show'} All Fixtures
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Opponent</th>
                        <th>Date and Time</th>
                    </tr>
                </thead>
                <tbody>
                    {allMatches && allMatches.map((match, index) => {
                        let style = {};
                        if (index === nextGameIndex) {
                            style = {background: "#ffd230" , color:"black" };
                        } else if (index === currentGameIndex) {
                            style = { background: "#2866f6" , color:"white" };
                        }

                        return (
                            <tr key={index} >

                                <td>
                                    <img src={`https://flagpedia.net/data/flags/normal/${teamToCountryCode[match.team]}.png`} className="flag-icon" />
                                    {match.team}
                                </td>
                                <td>
                                    <img src={`https://flagpedia.net/data/flags/normal/${teamToCountryCode[match.opponent]}.png`} className="flag-icon" />
                                    {match.opponent}
                                </td>

                                <td style={style}>{new Date(match.dataTime).toLocaleString()}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

    );
}
export default MatchesTable;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const MatchTicker = (props) => {
    const { team1, team2, dateAndTime } = props;
    const [allMatches, setallMatches] = useState(null);
    const [userInteracted, setUserInteracted] = useState(false);


    const scrollContainerRef = useRef(null);

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
                
                setallMatches(matches);
    
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchAllData();
    }, []);

    // useEffect(() => {
    //     const scrollContainer = scrollContainerRef.current;
    //     const scrollSpeed = 5;
    
    //     let scrollInterval;
        
    //     if (!userInteracted) {
    //         scrollInterval = setInterval(() => {
    //             if (scrollContainer) {
    //                 scrollContainer.scrollLeft += scrollSpeed;
    //             }
    //         }, 100);
    //     }
    
    //     // Cleanup the interval when the component is unmounted
    //     return () => clearInterval(scrollInterval);
    // }, [userInteracted]);


    const scroll = (direction) => {
        setUserInteracted(true);
    
        if (!scrollContainerRef.current) return;
        const distance = 1400;
        scrollContainerRef.current.scrollLeft += (distance * direction);
    
        // After 5 seconds (or any desired time), reset the userInteracted state so auto-scrolling resumes
        // setTimeout(() => setUserInteracted(false), 10000);
    }
    if (!allMatches) return null;  // Render nothing if data is still loading

    return (
        <div style={{ height: "110px", width: "100%" }} className='MatchTicker'>
            {/* Left arrow */}
            <button onClick={() => scroll(-1)} className="scroll-arrow left-arrow">	&lt;</button>

            {/* Start of the scrollable container */}
            <div ref={scrollContainerRef} className="scrollable-container">
                {allMatches.map((match, index) => (
                    <div key={index} className='fixtureWrapper'>
                        <div className='Teams'>
                            <div className='teamScore'>
                                <img src={`https://flagpedia.net/data/flags/normal/${teamToCountryCode[match.team]}.png`} className="flag-icon" />
                                <div>{match.team}</div>
                            </div>
                            <div>{match.F}</div>
                        </div>
                        <div className='Teams'>
                            <div className='teamScore'>
                                <img src={`https://flagpedia.net/data/flags/normal/${teamToCountryCode[match.opponent]}.png`} className="flag-icon" />
                                <div>{match.opponent}</div>
                            </div>
                            <div>{match.A}</div>
                        </div>
                        <div className='dateandTime'>{new Date(match.dataTime).toLocaleString()}</div>
                    </div>
                ))}
            </div>
            {/* End of the scrollable container */}

            {/* Right arrow */}
            <button onClick={() => scroll(1)} className="scroll-arrow right-arrow">&gt;</button>
        </div>
    );
}

export default MatchTicker;

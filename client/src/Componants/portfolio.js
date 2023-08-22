import React from 'react';
import '../App.css';



// You can import any CSS or images if you need
// import './Portfolio.css';
// import project1Image from './path/to/image1.jpg';

const Portfolio = () => {
    

    return (
        <div className="portfolio-card">
            
            <div className="projects">
               <p className="hi"> Hi, my name is</p>
               <h1 style={{color:"rgb(204, 214, 246)"}}>Adam Wadsworth</h1>
               <div className="bodybit"> 
               <h3>Software Developer</h3>
               <h2 className='tagdescription'>Building React/Node/Express applications for the web</h2>
               <p className='words'>This site demos what can be done using REST API, database connections, React frontend fuctionality and Node.js API building. Please click some of the icons on the left</p>
               </div>
            </div>

            <div style={{color:"rgb(78, 197, 175)"}} >Contact details: adam.y2009@gmail.com</div>
            <div style={{color:"rgb(78, 197, 175)"}} ><a style={{color:"rgb(78, 197, 175)"}} href="https://github.com/highfly117">GitHub: https://github.com/highfly117</a></div>
        </div>
    );
}
export default Portfolio;

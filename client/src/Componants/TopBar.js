import React, { useState } from 'react';
import "./CSS/Navbar.css";
import axios from "axios";


const TopBar = ({ data }) => {
  const [search, setSearch] = useState('');  // add a state for the search input
  const { updateData } = data;

  const loadData = async () => {
    try {
      const response = await axios.get("http://192.168.0.140:5000/api/v1/getWeather", {
        params: { search },  // use the search value in your API request
      });
      console.log(response.data);
      if(response.data.error){
        
        console.log(response.data.error)

        alert(`Error - ${response.data.error.message}`)
      }else{
        updateData(response.data); // Here you update the state

      }
       
      
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {  // this function will be triggered when the input value changes
    setSearch(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();  // prevent the page from being refreshed
    loadData(); // load data when the form is submitted
  }

  return (
    <div className="navbarRE">
        <nav className="navbar bg-light" style={{"flexWrap":"nowrap"}}>
           <a className="navbar-brand" style={{"marginLeft":"15px"}}>Weather API - {data.locationName + ", "} {data.locationCountry}   </a>
             
                <form className="d-inline-flex" role="search" onSubmit={handleSubmit}>
                  
                    <input className="form-control me-2" type="search" placeholder="Enter Town, city or Postcode" aria-label="Search" value={search} onChange={handleSearch} />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            
        </nav>
    </div>
  )
}

export default TopBar;
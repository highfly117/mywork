import React, { useState, useEffect, useRef, useMemo } from 'react';

import "./CSS/Navbar.css";
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAJiDxL5x2vUHgH77_f6WOyAIVRacWUWFI';
const GOOGLE_GEOCODING_API_KEY = "AIzaSyDHTJQYNpmNtUB5wR8tsDll9-XW1VmOcwY";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

export default function GoogleMaps({ data }) {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const { updateData } = data;
  const {updateLocation} = data;
  const loaded = React.useRef(false);
  const [search, setSearch] = React.useState('');  // add a state for the search input

  //console.log(data)

  const loadData = async (search) => {

    try {
      const response = await axios.get("http://192.168.0.140:5000/api/v1/getWeather", { params: { search } });
      //const response = await axios.get("https://express-api-git-master-highfly117.vercel.app/api/v1/getWeather", {params: { search }});
     // console.log(response.data);
      if (response.data.error) {

        console.log(response.data.error)

        alert(`Error - ${response.data.error.message}`)
      } else {
        updateData(response.data); // Here you update the state
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {  // this function will be triggered when the input value changes
    setSearch(event.target.value);
  }

  const handleSubmit = async (newValue) => {
    console.log(newValue)
    loadData(newValue.description); // load data when the form is submitted
    console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${newValue.description}&key=${GOOGLE_GEOCODING_API_KEY}`)
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${newValue.description}&key=${GOOGLE_GEOCODING_API_KEY}`);
    if (response.data.results && response.data.results.length > 0) {
      const latitude = response.data.results[0].geometry.location.lat;
      const longitude = response.data.results[0].geometry.location.lng;
      console.log(response.data)
      updateLocation({latitude , longitude}); // Update location
    }
  }

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    [],
  );

  React.useEffect(() => {
    let active = true;

    //console.log("running")

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <div className="navbarRE">
      <nav className="navbar bg-light" style={{ "flexWrap": "nowrap" }}>
        <a className="navbar-brand" style={{ "marginLeft": "15px" }}>Weather API - {data.locationName + ", "} {data.locationCountry}  </a>
        <Autocomplete
          id="google-map-demo"
          sx={{ width: 300 }}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.description
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          value={value}
          noOptionsText="No locations"
          onChange={(event, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
            handleSubmit(newValue)
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Add a location" fullWidth />
          )}
          renderOption={(props, option) => {
            const matches =
              option.structured_formatting.main_text_matched_substrings || [];

            const parts = parse(
              option.structured_formatting.main_text,
              matches.map((match) => [match.offset, match.offset + match.length]),
            );

            return (
              <li {...props}>
                <Grid container alignItems="center">
                  <Grid item sx={{ display: 'flex', width: 44 }}>
                    <LocationOnIcon sx={{ color: 'text.secondary' }} />
                  </Grid>
                  <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                    {parts.map((part, index) => (
                      <Box
                        key={index}
                        component="span"
                        sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                      >
                        {part.text}
                      </Box>
                    ))}

                    <Typography variant="body2" color="text.secondary">
                      {option.structured_formatting.secondary_text}
                    </Typography>
                  </Grid>
                </Grid>
              </li>
            );
          }}
        />
      </nav>
    </div>
  );
}
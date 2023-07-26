import axios from "axios";
import React, { useState, useEffect } from "react";

const MatchCountriesTable = ({ matchCountries }) => {
  const [singleCountryData, setSingleCountryData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const multipleMatchesTable = () => {
    return (
      <table>
        <tbody>
          {matchCountries.map((country) => (
            <tr key={country.name.common}>
              <td>{country.name.common}</td>
              <td>
                <button onClick={() => handleButtonClick(country.name.common)}>
                  Show
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const tooManyMatchesMsg = () => {
    return <p>Too many matches, specify another filter</p>;
  };

  const getSingleCountryData = (countryName) => {
    return axios
      .get(`https://restcountries.com/v2/name/${countryName}?fullText=true`)
      .then((res) => res.data[0])
      .catch((err) => {
        console.log(err);
        return null;
      });
  };

  const displaySingleCountry = (countryName) => {
    getSingleCountryData(countryName).then((countryData) => {
      setSingleCountryData(countryData);
    });
  };

  const handleButtonClick = (countryName) => {
    setSelectedCountry(countryName);
    displaySingleCountry(countryName);
  };

  const getWeather = async (city) => {
    const api_key = process.env.REACT_APP_NINJAS_API_KEY;
    try {
      const res = await axios.get(
        `https://api.api-ninjas.com/v1/weather?city=${city}`,
        {
          headers: { "X-Api-Key": api_key },
        }
      );
      return res.data;
    } catch (res_1) {
      console.log("Failed to get weather data, reason:", res_1);
      return null;
    }
  };

  useEffect(() => {
    if (matchCountries.length === 1) {
      const countryName = matchCountries[0].name.common;
      displaySingleCountry(countryName);
    } else {
      setSingleCountryData(null);
    }
  }, [matchCountries]);

  useEffect(() => {
    if (selectedCountry) {
      displaySingleCountry(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (singleCountryData) {
      setLoading(true);
      getWeather(singleCountryData.capital)
        .then((cityWeatherData) => {
          console.log("cityWeatherData:", cityWeatherData); // Log the entire object
          if (cityWeatherData) {
            setWeatherData(cityWeatherData);
          } else {
            console.log("Weather data not available.");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [singleCountryData]);

  const createCountryProfile = (country) => {
    if (!country) {
      return <p>No country data available.</p>;
    }
    return (
      <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map((language, index) => (
            <li key={index}>{language.name}</li>
          ))}
        </ul>
        <br />
        <img src={country.flags.png} alt={country.flags.alt} />
        <br />
        {loading ? (
          <p>Loading weather data...</p>
        ) : (
          weatherData && (
            <div>
              <h3>Weather in {singleCountryData.capital}</h3>
              <p>Temperature: {weatherData.temp} °C</p>
              <p>Wind Speed: {weatherData.wind_speed} km</p>
            </div>
          )
        )}
      </div>
    );
  };

  const displayResults = () => {
    if (matchCountries) {
      if (matchCountries.length > 10) {
        return tooManyMatchesMsg();
      } else if (matchCountries.length === 1 || singleCountryData) {
        return createCountryProfile(singleCountryData);
      } else {
        return multipleMatchesTable();
      }
    }
  };

  return displayResults();
};

export default MatchCountriesTable;

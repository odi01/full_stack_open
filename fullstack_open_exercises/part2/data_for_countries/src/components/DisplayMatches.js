import axios from "axios";
import React, { useState, useEffect } from "react";

const MatchCountriesTable = ({ matchCountries }) => {
  const [singleCountryData, setSingleCountryData] = useState(null);

  const multipleMatchesTable = () => {
    return (
      <table>
        <tbody>
          {matchCountries.map((country) => (
            <tr key={country.name.common}>
              <td>{country.name.common}</td>
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

  useEffect(() => {
    if (matchCountries.length === 1) {
      const countryName = matchCountries[0].name.common;
      getSingleCountryData(countryName).then((countryData) => {
        setSingleCountryData(countryData);
      });
    } else {
      setSingleCountryData(null);
    }
  }, [matchCountries]);

  const createCountryProfile = (country) => {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p> {/* "capital" instead of "captial" */}
        <p>Area: {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map((language, index) => (
            <li key={index}>{language.name}</li>
          ))}
        </ul>
        <br />
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    );
  };

  const displayResults = () => {
    if (matchCountries) {
      if (matchCountries.length > 10) {
        return tooManyMatchesMsg();
      } else if (matchCountries.length === 1) {
        if (singleCountryData) {
          return createCountryProfile(singleCountryData);
        }
        return <p>Loading...</p>;
      } else {
        return multipleMatchesTable();
      }
    }
  };

  return displayResults();
};

export default MatchCountriesTable;

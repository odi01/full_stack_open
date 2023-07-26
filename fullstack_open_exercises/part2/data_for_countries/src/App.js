import axios from "axios";
import { useState, useEffect } from "react";

import SearchCountriesForm from "./components/SearchCountriesForm";
import DisplayMatches from "./components/DisplayMatches";

const App = () => {
  const [data, setData] = useState([]);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [matchCountries, setMatchCountries] = useState([]);

  useEffect(() => {
    getAllCountries();
  }, []);

  const getAllCountries = () => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  if (data.length === 0) {
    return <h1>Loading...</h1>;
  }

  const findKeywordMatches = (keyword) => {
    return data.filter((country) =>
      country.name.common.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const handleKeywordChange = (event) => {
    const keyword = event.target.value;
    setFilterKeyword(keyword);
    event.preventDefault();
    const matches = findKeywordMatches(keyword);
    if (matches.length > 0) {
      setMatchCountries([...matches]);
    } else {
      setMatchCountries([]);
    }
  };

  return (
    <div>
      <br />
      <SearchCountriesForm
        keyword={filterKeyword}
        onKeywordChange={handleKeywordChange}
      />
      <DisplayMatches matchCountries={matchCountries} />
    </div>
  );
};

export default App;

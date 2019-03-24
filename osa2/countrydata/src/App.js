import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ countries }) => {
  if (countries.length === 1) {
    return <Country country={countries} />;
  } else if (countries.length < 10) {
    return countries.map(country => (
      <p key={country.alpha2Code}>{country.name}</p>
    ));
  } else {
    return <p>Too many matches, specify another filter.</p>;
  }
};

const Country = ({ country }) => {
  console.log(country[0].languages);

  return (
    <>
      <h2>{country[0].name}</h2>
      <p>capital {country[0].capital} </p>
      <p>population {country[0].population} </p>

      <h3>languages</h3>
      <ul>
        {country[0].languages.map(lang => (
          <Language key={lang.name} language={lang} />
        ))}
      </ul>
      <img src={country[0].flag} alt="flag" width="200" />
    </>
  );
};

const Language = ({ language }) => {
  return <li>{language.name}</li>;
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterRule, setFilterRule] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  //const rows = () => countries.map(country => <li>{country.name}</li>);

  const countriesToShow =
    filterRule === ""
      ? []
      : countries.filter(p => p.name.toLowerCase().includes(filterRule));

  const handleFilter = event => {
    if (event.target.value !== "") {
      setFilterRule(event.target.value);
      console.log(event.target.value);
    } else {
      setFilterRule("");
    }
  };

  return (
    <div>
      <div>
        find countries <input onChange={handleFilter} />
      </div>
      <Countries countries={countriesToShow} />
      <div />
    </div>
  );
};

export default App;

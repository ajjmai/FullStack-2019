import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ countries, setFilterRule, weather, getWeather }) => {
  if (countries.length === 1) {
    return (
      <Country country={countries} weather={weather} getWeather={getWeather} />
    );
  } else if (countries.length < 10) {
    return countries.map(country => (
      <div key={country.alpha2Code}>
        {country.name}{" "}
        <button onClick={() => setFilterRule(country.name.toLowerCase())}>
          show
        </button>
      </div>
    ));
  } else {
    return <p>Too many matches, specify another filter.</p>;
  }
};

const Country = ({ country, weather, getWeather }) => {
  return (
    <>
      <h2>{country[0].name}</h2>
      <p>capital {country[0].capital} </p>
      <p>population {country[0].population} </p>
      <h3>languages</h3>
      <ul>
        {country[0].languages.map(lang => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={country[0].flag} alt="flag" width="200" />
      <h3>Weather in {country[0].capital} </h3>
      <Weather
        city={country[0].capital}
        weather={weather}
        getWeather={getWeather}
      />
    </>
  );
};

const Weather = ({ city, weather, getWeather }) => {
  getWeather(city);
  if (typeof weather.current !== "undefined") {
    return (
      <>
        <p>
          <b> temperature:</b> {weather.current.temp_c} Celsius
        </p>
        <img src={weather.current.condition.icon} alt="weather" />
        <p>
          <b> wind:</b> {weather.current.wind_kph} kph direction{" "}
          {weather.current.wind_dir}
        </p>
      </>
    );
  } else {
    return <> </>;
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterRule, setFilterRule] = useState("");
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

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

  const getWeather = city => {
    const api =
      "http://api.apixu.com/v1/current.json?key=69b1dd16a2d943ff8d4175110192503&q=" +
      city.toLowerCase();
    console.log(api);
    useEffect(() => {
      axios.get(api).then(response => {
        setWeather(response.data);
      });
    }, []);
  };

  return (
    <div>
      <div>
        find countries <input onChange={handleFilter} />
      </div>
      <div>
        <Countries
          countries={countriesToShow}
          setFilterRule={setFilterRule}
          weather={weather}
          getWeather={getWeather}
        />
      </div>
    </div>
  );
};

export default App;

import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" />
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filterText, setFilterText] = useState("");
  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
    setFilteredCountries(
      countries.filter(
        (country) =>
          country.name.common
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) >= 0
      )
    );
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleShowCountry = (country) => {
    setFilteredCountries([country]);
  };

  return (
    <div>
      <p>
        find countries{" "}
        <input value={filterText} onChange={handleFilterTextChange} />
      </p>
      {filteredCountries.length >= 10 && (
        <p>Too many matches,specify another filter</p>
      )}
      {filteredCountries.length < 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map((country) => (
          <div>
            <p>
              {country.name.common}
              <button onClick={() => handleShowCountry(country)}>show</button>
            </p>
          </div>
        ))}
      {filteredCountries.length === 1 && (
        <Country country={filteredCountries[0]}></Country>
      )}
    </div>
  );
}

export default App;

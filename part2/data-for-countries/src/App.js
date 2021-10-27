import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filterText, setFilterText] = useState("");
  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
  );

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
        filteredCountries.map((country) => <p>{country.name.common}</p>)}
      {filteredCountries.length === 1 && (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <p>capital {filteredCountries[0].capital[0]}</p>
          <p>population {filteredCountries[0].population}</p>
          <h2>languages</h2>
          <ul>
            {Object.values(filteredCountries[0].languages).map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <img src={filteredCountries[0].flags.png} alt="flag" />
        </div>
      )}
    </div>
  );
}

export default App;

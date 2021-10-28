import axios from "axios";

const getAll = () => {
  return axios
    .get("http://localhost:3001/persons")
    .then((response) => response.data);
};

const create = (personObject) => {
  return axios
    .post("http://localhost:3001/persons", personObject)
    .then((response) => response.data);
};

const personService = {
  getAll,
  create,
};

export default personService;

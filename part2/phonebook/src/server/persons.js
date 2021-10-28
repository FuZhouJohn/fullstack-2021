import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (personObject) => {
  return axios.post(baseUrl, personObject).then((response) => response.data);
};

const deleteById = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const personService = {
  getAll,
  create,
  deleteById,
};

export default personService;

import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (personObject) => {
  return axios
    .post(baseUrl, personObject)
    .then((response) => response.data)
    .catch((error) => {
      return Promise.reject(error.response.data.error);
    });
};

const deleteById = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const update = (id, personObject) => {
  return axios
    .put(`${baseUrl}/${id}`, personObject)
    .then((response) => response.data)
    .catch((error) => {
      return Promise.reject(error.response.data.error);
    });
};

const personService = {
  getAll,
  create,
  deleteById,
  update,
};

export default personService;

import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req
    .then((res) => res.data)
    .catch((err) => console.log(`Failed to delete contact, exp: ${err}`));
};

const exportedObject = {
  getAll,
  create,
  remove,
};

export default exportedObject;

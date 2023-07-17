import axios from "axios";
const baseUrl = "http://localhost:3001/contacts";

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

const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  return req
  .then((res) => res.data)
  // .catch((err) => console.log(`Failed to update the object, exp: ${err}`))
}

const exportedObject = {
  getAll,
  create,
  remove,
  update
};

export default exportedObject;

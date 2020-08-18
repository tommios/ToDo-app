import client from "../services/http";

const BASE_URL = "/todos";

export const getAll = () => {
  return client.get(`${BASE_URL}`).then((response) => response.data);
};

export const getById = (id) => {
  return client.get(`${BASE_URL}/${id}`).then((response) => response.data);
};

export const remove = (id) => {
  return client
    .delete(`${BASE_URL}/${id}`)
    .then((response) => console.log(response.data));
};

export const update = (id, data) => {
  return client
    .patch(`${BASE_URL}/${id}`, data)
    .then((response) => response.data);
};

export const create = (data) => {
  return client.post(`${BASE_URL}`, data).then((response) => response.data);
};

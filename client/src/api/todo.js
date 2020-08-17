import client from "../services/http";

const BASE_URL = "/todos";

export const getAll = () => {
  return client.get(`${BASE_URL}`).then((response) => response.data);
};

export const getById = (id) => {
  return client.get(`${BASE_URL}/${id}`).then((response) => response.data);
};

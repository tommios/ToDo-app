// import { TODOS_FETCH } from "./types";

// export const fetchTodos = (data) => async (dispatch, getState) => {
//   console.log("DATA TO EXECUTE:", data);
//   const {
//     todos: { items },
//   } = getState();

//   dispatch({
//     type: TODOS_FETCH,
//     payload: { items: [...items, items.length] },
//   });
// };
import {
  TODOS_CREATE,
  TODOS_GET_ALL,
  TODOS_GET_ONE,
  TODOS_DELETE_ONE,
  TODOS_UPDATE,
} from "./types";

export const todoCreate = (data) => ({
  type: TODOS_UPDATE,
  request: {
    method: "POST",
    url: `/todos`,
    data: { data },
  },
});

export const todoGetAll = () => ({
  type: TODOS_GET_ALL,
  request: {
    method: "GET",
    url: "/todos",
  },
});

export const todoGetOne = (id) => ({
  type: TODOS_GET_ONE,
  request: {
    method: "GET",
    url: `/todos/${id}`,
  },
});

export const todoUpdate = (id, data) => ({
  type: TODOS_UPDATE,
  request: {
    method: "PATCH",
    url: `/todos/${id}`,
    data: { data },
  },
});

export const todoDeleteOne = (id) => ({
  type: TODOS_DELETE_ONE,
  request: {
    method: "DELETE",
    url: `/todos/${id}`,
  },
});

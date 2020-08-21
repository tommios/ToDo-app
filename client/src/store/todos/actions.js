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
import { TODOS_AXIOS } from "./types";

const axiosTodo = () => ({
  type: TODOS_AXIOS,
  request: {
    method: "GET",
    url: "/todos",
  },
});

export default axiosTodo;

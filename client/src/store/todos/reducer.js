import { TODOS_FETCH } from "./types";
import { TODOS_AXIOS } from "./types";
import { success, error } from "@redux-requests/core";

// const initialState = {
//   items: [],
//   isLoading: false,
// };

const initialState = {
  todos: [],
  isLoading: false,
};

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case TODOS_FETCH: {
//       return {
//         ...state,
//         isLoading: true,
//         errors: undefined,
//       };
//     }
//     case success(TODOS_FETCH): {
//       return {
//         ...state,
//         items: action.payload.items,
//         isLoading: false,
//       };
//     }
//     case error(TODOS_FETCH): {
//       return {
//         ...state,
//         items: [],
//         isLoading: false,
//         errors: action.payload.error,
//       };
//     }
//     default: {
//       return state;
//     }
//   }
// };

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case TODOS_AXIOS: {
      return {
        ...state,
        todos: [],
        isLoading: true,
        errors: undefined,
      };
    }
    case success(TODOS_AXIOS): {
      return {
        ...state,
        todos: action.response.data,
        isLoading: false,
      };
    }
    case error(TODOS_AXIOS): {
      return {
        ...state,
        todos: [],
        isLoading: false,
        errors: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
};

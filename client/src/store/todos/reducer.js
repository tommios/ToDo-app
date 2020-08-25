//import { TODOS_FETCH } from "./types";
import {
  TODOS_GET_ALL,
  TODOS_GET_ONE,
  TODOS_DELETE_ONE,
  TODOS_UPDATE,
} from "./types";
import { success, error } from "@redux-requests/core";

// const initialState = {
//   items: [],
//   isLoading: false,
// };

const initialState = {
  todos: [],
  todo: {},
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
    case TODOS_GET_ALL: {
      return {
        ...state,
        todos: [],
        isLoading: true,
        errors: undefined,
      };
    }
    case success(TODOS_GET_ALL): {
      return {
        ...state,
        todos: action.response.data,
        isLoading: false,
      };
    }
    case error(TODOS_GET_ALL): {
      return {
        ...state,
        todos: [],
        isLoading: false,
        errors: action.payload.error,
      };
    }

    case TODOS_GET_ONE: {
      return {
        ...state,
        todo: {},
        isLoading: true,
        errors: undefined,
      };
    }
    case success(TODOS_GET_ONE): {
      return {
        ...state,
        todo: action.response.data,
        isLoading: false,
      };
    }
    case error(TODOS_GET_ONE): {
      return {
        ...state,
        todo: {},
        isLoading: false,
        errors: action.payload.error,
      };
    }

    case TODOS_UPDATE: {
      return {
        ...state,
        todo: {},
        isLoading: true,
        errors: undefined,
      };
    }
    case success(TODOS_UPDATE): {
      return {
        ...state,
        todo: action.response.data,
        isLoading: false,
      };
    }
    case error(TODOS_UPDATE): {
      return {
        ...state,
        todo: {},
        isLoading: false,
        errors: action.error.response.data,
      };
    }

    default: {
      return state;
    }
  }
};

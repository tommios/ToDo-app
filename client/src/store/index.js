import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import httpClient from "../services/http";
import { handleRequests } from "@redux-requests/core";
import { createDriver } from "@redux-requests/axios";
import thunk from "redux-thunk";
import logger from "redux-logger";

import todosReducer from "./todos/reducer";
import authReducer from "./auth/reducer";
import errorReducer from "./auth/errorReducer";

import { onRequest, onSuccess, onError } from "./interceptors";

export const configureStore = () => {
  const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: createDriver(httpClient),
    onRequest,
    onSuccess,
    onError,
  });

  const reducers = combineReducers({
    requests: requestsReducer,
    todos: todosReducer,
    auth: authReducer,
    errors: errorReducer,
  });

  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...requestsMiddleware, thunk, logger))
  );

  return store;
};

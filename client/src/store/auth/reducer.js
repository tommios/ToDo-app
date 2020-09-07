import {
    LOGIN_USER,
    LOGOUT_USER,
    SIGN_UP_USER,
    GET_ERRORS,
    USER_LOADING,
    SET_CURRENT_USER,
} from "./types";

import {success, error} from "@redux-requests/core";
//import initialState from "../initialState";
const initialState = {
    isLoggedIn: false,
};

export default (state = initialState, action) => {

    switch (action.type) {
        case LOGIN_USER: {
            return {
                ...state,
                isLoggedIn: false,
                errors: undefined,
            };
        }
        case success(LOGIN_USER): {
            localStorage.setItem("token", action.response.data.token);
            localStorage.setItem("refreshToken", action.response.data.refreshToken);
            return {
                ...state,
                isLoggedIn: true,
            };
        }
        case error(LOGIN_USER): {
            return {
                ...state,
                isLoggedIn: false,
                errors: action.error,
            };
        }

        case SIGN_UP_USER: {
            return {
                ...state,
                isLoggedIn: false,
                errors: undefined,
            };
        }
        case success(SIGN_UP_USER): {
            localStorage.setItem("token", action.response.data.token);
            localStorage.setItem("refreshToken", action.response.data.refreshToken);
            return {
                ...state,
                isLoggedIn: true,
            };
        }
        case error(SIGN_UP_USER): {
            return {
                ...state,
                isLoggedIn: false,
                errors: action.error,
            };
        }

        default: {
            return state;
        }
    }
};
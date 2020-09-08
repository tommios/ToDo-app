import {
    LOGIN_USER,
    LOGOUT_USER,
    SIGN_UP_USER,
    GET_ERRORS,
    USER_LOADING,
    SET_CURRENT_USER,
} from "./types";
import isEmpty from "is-empty";
import {success, error} from "@redux-requests/core";

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
    // isLoggedIn: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER: {
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            };
        }
        case success(SET_CURRENT_USER): {
            localStorage.setItem("token", action.response.data.token);
            localStorage.setItem("refreshToken", action.response.data.refreshToken);
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        }
        case error(SET_CURRENT_USER): {
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            };
        }


        case USER_LOADING: {
            return {
                ...state,
                loading: false
            };
        }
        case success(USER_LOADING): {
            localStorage.setItem("token", action.response.data.token);
            localStorage.setItem("refreshToken", action.response.data.refreshToken);
            return {
                ...state,
                loading: true
            };
        }
        case error(USER_LOADING): {
            return {
                ...state,
                loading: false
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
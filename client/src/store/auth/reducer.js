import {
    LOGIN_USER,
    LOGOUT_USER,
    SIGN_UP_USER,
    USER_LOADING,
    SET_CURRENT_USER,
} from "./types";
import {success, error} from "@redux-requests/core";
import jwt_decode from "jwt-decode";

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    errors: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: {
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            };
        }
        case success(LOGIN_USER): {
            // Set token to localStorage
            const {token} = action.response.data;
            localStorage.setItem("accessToken", token);

            // Decode token to get user data
            const decoded = jwt_decode(token);

            return {
                ...state,
                isAuthenticated: true,
                user: decoded
            };
        }
        case error(LOGIN_USER): {
            return {
                ...state,
                errors: action.error.response.data
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
                isAuthenticated: false,
                errors: undefined,
            };
        }
        case success(SIGN_UP_USER): {
            // Set token to localStorage
            const {token} = action.response.data;
            localStorage.setItem("accessToken", token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            return {
                ...state,
                isAuthenticated: true,
                user: decoded
            };
        }
        case error(SIGN_UP_USER): {
            return {
                ...state,
                isAuthenticated: false,
                errors: action.error.response.data,
            };
        }

        case LOGOUT_USER: {
            // Remove token from local storage
            localStorage.removeItem("accessToken");
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            };
        }

        case SET_CURRENT_USER: {
            const token = action.token;
            if (token) {
                const decoded = jwt_decode(token);
                return {
                    ...state,
                    isAuthenticated: true,
                    user: decoded
                }
            }
            else{
                return {
                    ...state,
                    isAuthenticated: false,
                    user: {}
                }
            }
        }

        default: {
            return state;
        }
    }
};
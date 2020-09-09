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
        ////////   SET_CURRENT_USER   ////////
        case SET_CURRENT_USER: {
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            }
        }
        case success(SET_CURRENT_USER): {
            const userinfo = action.response.data.userinfo
            if (userinfo.id) {
                return {
                    ...state,
                    isAuthenticated: true,
                    user: userinfo
                }
            } else {
                return {
                    ...state,
                    isAuthenticated: false,
                    user: {}
                }
            }
        }
        case error(SET_CURRENT_USER): {
            return {
                ...state,
                errors: action.error.response.data
            };
        }

        ////////   LOGIN_USER   ////////
        case LOGIN_USER: {
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            };
        }
        case success(LOGIN_USER): {
            /**
             * { token: string; user: object; }
             * @type {any | undefined}
             */
            return {
                ...state,
                isAuthenticated: true,
                user: action.response.data.userinfo
            };
        }
        case error(LOGIN_USER): {
            return {
                ...state,
                errors: action.error.response.data
            };
        }

        ////////   USER_LOADING   ////////
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

        ////////   SIGN_UP_USER   ////////
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

        ////////   LOGOUT_USER   ////////
        case LOGOUT_USER: {
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            };
        }

        default: {
            return state;
        }
    }
};
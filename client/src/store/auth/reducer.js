import {
    LOGIN_USER,
    LOGOUT_USER,
    SIGN_UP_USER,
    USER_LOADING,
    SET_CURRENT_USER,
    RESET_PASSWORD,
    NEW_PASSWORD,
    EMAIL_CONFIRM,
} from "./types";
import {success, error} from "@redux-requests/core";

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
            return {
                ...state,
                isAuthenticated: true,
                user: action.response.decoded
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

        ////////   RESET_PASSWORD   ////////
        case RESET_PASSWORD: {
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            };
        }
        case success(RESET_PASSWORD): {
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            };
        }
        case error(RESET_PASSWORD): {
            return {
                ...state,
                errors: action.error.response.data
            };
        }

        ////////   NEW_PASSWORD   ////////
        case NEW_PASSWORD: {
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            };
        }
        case success(NEW_PASSWORD): {
             return {
                ...state,
                isAuthenticated: true,
                user: action.response.decoded
            };

        }
        case error(NEW_PASSWORD): {
            return {
                ...state,
                isAuthenticated: false,
                errors: action.error.response.data,
            };
        }

        ////////   NEW_PASSWORD   ////////
        case EMAIL_CONFIRM: {
            return {
                ...state,
                user: {}
            };
        }
        case success(EMAIL_CONFIRM): {
            return {
                ...state,
                user: action.response.data.userinfo
            };

        }
        case error(EMAIL_CONFIRM): {
            return {
                ...state,
                errors: action.error.response.data,
            };
        }


        default: {
            return state;
        }
    }
};
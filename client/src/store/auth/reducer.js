import {
    LOGIN_USER,
    LOGOUT_USER,
    SIGN_UP_USER,
    GET_ERRORS,
    USER_LOADING,
    SET_CURRENT_USER,
} from "./types";

import {success, error} from "@redux-requests/core";
import initialState from "../initialState";
// const initialState = {
//     refreshToken: "",
//     isLoggedIn: false,
// };

export default (state = initialState(), action) => {

    switch (action.type) {
        case LOGIN_USER: {
            return {
                ...state,
                refreshToken: "",
                isLoggedIn: false,
                errors: undefined,
            };
        }
        case success(LOGIN_USER): {
            localStorage.setItem("token", action.response.data.token);

            return {
                ...state,
                refreshToken: action.response.data.refreshToken,
                isLoggedIn: true,
            };
        }
        case error(LOGIN_USER): {
            return {
                ...state,
                refreshToken: "",
                isLoggedIn: false,
                errors: action.error,
            };
        }

        default: {
            return state;
        }
    }
};
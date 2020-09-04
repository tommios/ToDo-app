import {
    LOGIN_USER,
    LOGOUT_USER,
    SIGN_UP_USER,
    GET_ERRORS,
    USER_LOADING,
    SET_CURRENT_USER,
} from "./types";

export const logIn = (user) => ({
    type: LOGIN_USER,
    request: {
        method: "POST",
        url: "/auth/login",
        data: {...user},
    },
});
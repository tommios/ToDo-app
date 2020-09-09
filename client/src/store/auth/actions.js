import {
    LOGIN_USER,
    LOGOUT_USER,
    SIGN_UP_USER,
    USER_LOADING,
    SET_CURRENT_USER,
} from "./types";
import jwt_decode from "jwt-decode";

// Init app
export const init = () => ({
    type: SET_CURRENT_USER,
    request: {
        method: 'GET',
        url: '/auth/userinfo'
    }
});

export const logIn = (user) => ({
    type: LOGIN_USER,
    request: {
        method: "POST",
        url: "/auth/login",
        data: {...user},
    },
    meta: {
        onSuccess: (response) => {
            localStorage.setItem('accessToken', response.data.token);
            return response;
        }
    }
});

export const signUp = (user) => ({
    type: SIGN_UP_USER,
    request: {
        method: "POST",
        url: "/auth/signup",
        data: {...user},
    }
});

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log user out
export const logoutUser = () => {
    // Remove token from local storage
    localStorage.removeItem("accessToken");
    return {
        type: LOGOUT_USER
    };
};
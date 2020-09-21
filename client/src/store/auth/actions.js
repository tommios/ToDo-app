import {
    LOGIN_USER,
    LOGOUT_USER,
    SIGN_UP_USER,
    USER_LOADING,
    SET_CURRENT_USER,
    RESET_PASSWORD,
    NEW_PASSWORD,
    EMAIL_CONFIRM
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
    },
    meta: {
        onSuccess: (response) => {
            // Set token to localStorage
            const {token} = response.data;
            localStorage.setItem("accessToken", token);

            // Decode token to get user data
            const decoded = jwt_decode(token);
            response.decoded = decoded;

            return response;
        }
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

export const resetPassword = (email) => ({
    type: RESET_PASSWORD,
    request: {
        method: "POST",
        url: "/auth/reset",
        data: {...email},
    }
});

export const newPassword = (token, password) => ({
    type: NEW_PASSWORD,
    request: {
        method: "POST",
        url: `/auth/password/${token}`,
        data: {password},
    },
    meta: {
        onSuccess: (response) => {
            // Set token to localStorage
            const {token} = response.data;
            localStorage.setItem("accessToken", token);

            // Decode token to get user data
            const decoded = jwt_decode(token);
            response.decoded = decoded;

            return response;
        }
    }
});

export const emailConfirm = (hash, user) => ({
    type: EMAIL_CONFIRM,
    request: {
        method: "POST",
        url: `/auth/verify`,
        data: {hash, user},
    }
});
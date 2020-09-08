import {
    LOGIN_USER,
    LOGOUT_USER,
    SIGN_UP_USER,
    USER_LOADING,
    SET_CURRENT_USER,
} from "./types";

export const logIn = (user) => ({
    type: LOGIN_USER,
    request: {
        method: "POST",
        url: "/auth/login",
        data: {...user},
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

// Init app
export const init = () => {
    const token = localStorage.getItem("accessToken");
    return {
        type: SET_CURRENT_USER,
        token,
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log user out
export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    };
};
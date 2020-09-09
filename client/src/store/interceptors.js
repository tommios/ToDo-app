export const onRequest = (request, action, store) => {
    try {
        const token = localStorage.getItem('accessToken');
        if (token) {
            // Apply authorization token to every request if logged in
            request.headers = {
                Authorization: `Bearer ${token}`,
            }
        } else {
            // Delete auth header
            request.headers = {
                Authorization: "",
            }
        }
    }
    catch(err){
        console.log(err);
    }

    return request;
};

export const onSuccess = (response, action, store) => {
    return response;
};

export const onError = async (error, action, store) => {
    throw error;
};

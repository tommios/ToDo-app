export const onRequest = (request, action, store) => {
    try {
        const token = localStorage.getItem('accessToken');
        request.headers = {
            Authorization: token ? `Bearer ${token}` : '',
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

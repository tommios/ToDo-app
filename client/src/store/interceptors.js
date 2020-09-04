export const onRequest = (request, action, store) => {
    // console.log('\n\nrequest ===> ', request.headers);
    // try {
    //     const token = localStorage.get('token');
    //
    //     request.headers = {
    //         Authorization: `Bearer ${token}`
    //     }
    //     console.log('\n\nrequest ===> ', request.headers);
    //     // request.replace('Bearer ', '')
    // } catch (e) {
    //     // dispatch('logout')
    // }
    return request;
};

export const onSuccess = (response, action, store) => {
    return response;
};

export const onError = async (error, action, store) => {
    throw error;
};

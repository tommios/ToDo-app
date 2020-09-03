export const onRequest = (request, action, store) => {
  // try {
  //   const token = localStorage.get('token');
  //   request.headers.Authorization = `Bearer ${token}`;
  //   data.replace('Bearer ', '')
  // } catch (e) {
  //   dispatch('logout')
  // }
  return request;
};

export const onSuccess = (response, action, store) => {
  return response;
};

export const onError = async (error, action, store) => {
  throw error;
};

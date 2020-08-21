export const onRequest = (request, action, store) => {
  return request;
};

export const onSuccess = (response, action, store) => {
  return response;
};

export const onError = async (error, action, store) => {
  throw error;
};

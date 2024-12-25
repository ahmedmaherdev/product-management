const baseURI = '/api/v1';
export const API_URIS = {
  AUTH: {
    BASE: baseURI + '/auth',
    SIGNUP: '/signup',
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },
  PRODUCTS: {
    BASE: baseURI + '/products',
    GET_ALL: '/',
    GET_BY_ID: '/:id',
    CREATE: '/',
    UPDATE_BY_ID: '/:id',
    DELETE_BY_ID: '/:id',
  },
};

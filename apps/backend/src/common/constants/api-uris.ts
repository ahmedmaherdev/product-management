
const baseURI = '/api/v1';
export const API_URIS = {
    AUTH: {
        BASE: baseURI + '/auth',
        REGISTER: '/signup',
        LOGIN: '/login',
        LOGOUT: '/logout',
    },
    PRODUCTS: {
        BASE: baseURI + '/products',
        GET_ALL: '/',
        GET_BY_ID: '/:id',
        CREATE: '/',
        UPDATE_BY_ID: '/:id',
        DELETE_BY_ID: '/:id',
    }
};
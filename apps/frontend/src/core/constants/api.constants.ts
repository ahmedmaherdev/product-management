import { environment } from "apps/frontend/src/environments/environment";

export const API_URIS = {
    AUTH: {
      LOGIN: environment.apiUrl + '/auth/login',
      SIGNUP: environment.apiUrl + '/auth/signup',
      FORGOT_PASSWORD: environment.apiUrl + '/auth/forgot-password',
    },
    PRODUCTS: {
      BASE: environment.apiUrl + '/products',
      GET_ALL: environment.apiUrl + '/products',
      GET_BY_ID: (id: string) => `${environment.apiUrl}/products/${id}`,
      CREATE: `${environment.apiUrl}/products`,
      UPDATE: (id: string) => `${environment.apiUrl}/products/${id}`,
      DELETE: (id: string) => `${environment.apiUrl}/products/${id}`,
    },
};
  
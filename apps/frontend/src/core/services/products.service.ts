import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { API_URIS } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  // Method to get products with pagination
  getProducts(page: number, pageSize: number): Observable<any> {
    const params = {
        page: page.toString(),
        limit: pageSize.toString(),
    };

    return this.http.get<any>(API_URIS.PRODUCTS.GET_ALL, { params }).pipe(take(1));
  }
}

// Node imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Own imports
import { Product } from 'src/app/model/product';
// Other
import API_SERVER from './config';

const API_BASE = `${API_SERVER}/products`

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  public addProduct(jwt: string, product: Product): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    })
    return this.http.post<Product>(API_BASE, product, { headers });
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_BASE);
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_BASE}/${id}`);
  }
}

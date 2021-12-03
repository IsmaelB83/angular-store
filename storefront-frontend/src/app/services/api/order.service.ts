// Node modules
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Own models
import { Order, EMPTY_ORDER } from 'src/app/model/order';
// Other
import API_SERVER from './config';

const API_BASE = `${API_SERVER}/users`

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: Order;

  constructor(private http: HttpClient) {
    // Initialization
    this.order = EMPTY_ORDER
  }

  public getActiveOrder(userId: number, jwt: string): Observable<Order> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.get<Order>(`${API_BASE}/${userId}/orders/active`, { headers });
  }

  public getOrders(userId: number, jwt: string): Observable<Order[]> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.get<Order[]>(`${API_BASE}/${userId}/orders`, { headers });
  }

  public createOrder(userId: number, jwt: string): Observable<Order> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.post<Order>('http://127.0.0.1:3000/users/1/orders', {}, { headers });
  }

  public completeOrder(userId: number, jwt: string, id: number): Observable<Order> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.put<Order>(`${API_BASE}/${userId}/orders/${id}`, { status: "complete" } , { headers });
  }

  public updateOrder(userId: number, jwt: string, id: number, productId: number, quantity: number): Observable<Order> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.put<Order>(`${API_BASE}/${userId}/orders/${id}/products/${productId}`, { quantity: quantity } , { headers });
  }
}

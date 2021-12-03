// Node imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// Own imports
import { User } from 'src/app/model/user';
// Other
import API_SERVER from './config';

const API_BASE = `${API_SERVER}/users`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${API_BASE}/auth`, {email, password});
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${API_BASE}`, user);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/User';
import { Pagination } from '../interface/Pagination';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl;

  getUsersPaginate(pageNumber: number = 1, pageSize: number = 10, departamentoId: number = 0, cargoId: number = 0): Observable<Pagination<User>> {
    const endPoint = "/users";
    let queryString = "";
    if (pageNumber) {
      queryString += `?pageNumber=${pageNumber}`
    }
    if (pageSize) {
      queryString += `&pageNumber=${pageSize}`
    }
    if (departamentoId) {
      queryString += `&departamentoId=${departamentoId}`
    }
    if (cargoId) {
      queryString += `&cargoId=${cargoId}`
    }

    return this.http.get<Pagination<User>>(this.apiUrl + endPoint + queryString);
  }

  saveUser(payload: User): Observable<User> {
    const endPoint = "/users";
    return this.http.post<User>(this.apiUrl + endPoint, payload);
  }

  deleteUser(id: number): Observable<any> {
    const endPoint = `/users/${id}`;
    return this.http.delete<any>(this.apiUrl + endPoint);
  }

  getUserById(id: number): Observable<User> {
    const endPoint = `/users/${id}`;
    return this.http.get<User>(this.apiUrl + endPoint);
  }

  editUser(id: number, payload: User) {
    const endPoint = `/users/${id}`;
    return this.http.put<User>(this.apiUrl + endPoint, payload);
  }
}

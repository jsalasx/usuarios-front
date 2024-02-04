import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/User';
import { Pagination } from '../interface/Pagination';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


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

    return this.http.get<Pagination<User>>('http://localhost:5276' + endPoint + queryString);
  }

  saveUser(payload: User): Observable<User> {
    const endPoint = "/users";
    return this.http.post<User>('http://localhost:5276' + endPoint, payload);
  }

  deleteUser(id: number): Observable<any> {
    const endPoint = `/users/${id}`;
    return this.http.delete<any>('http://localhost:5276' + endPoint);
  }

  getUserById(id: number): Observable<User> {
    const endPoint = `/users/${id}`;
    return this.http.get<User>('http://localhost:5276' + endPoint);
  }

  editUser(id: number, payload: User) {
    const endPoint = `/users/${id}`;
    return this.http.put<User>('http://localhost:5276' + endPoint, payload);
  }
}

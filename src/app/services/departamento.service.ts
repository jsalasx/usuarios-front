import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deparmento } from '../interface/Departamento';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl;

getDepartamentosAll(): Observable<Deparmento[]> {
    const endPoint = "/departamentos";
    return this.http.get<Deparmento[]>(this.apiUrl + endPoint);
  }
}

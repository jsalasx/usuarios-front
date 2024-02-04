import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deparmento } from '../interface/Departamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) { }


getDepartamentosAll(): Observable<Deparmento[]> {
    const endPoint = "/departamentos";
    return this.http.get<Deparmento[]>('http://localhost:5276' + endPoint);
  }
}

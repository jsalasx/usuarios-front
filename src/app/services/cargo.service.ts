import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo } from '../interface/Cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http: HttpClient) { }

getCargosAll(): Observable<Cargo[]> {
    const endPoint = "/cargos";
    return this.http.get<Cargo[]>('http://localhost:5276' + endPoint);
  }

}

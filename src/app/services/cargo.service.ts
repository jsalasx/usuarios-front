import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo } from '../interface/Cargo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl;
getCargosAll(): Observable<Cargo[]> {
    const endPoint = "/cargos";
    return this.http.get<Cargo[]>(this.apiUrl + endPoint);
  }

}

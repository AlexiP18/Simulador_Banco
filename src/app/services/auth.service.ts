import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(usuario: string, contrasena: string) {
    return this.http.post<any>('http://localhost:8080/API_BANCO/login.php', {
      usuario,
      contrasena
    });
  }
}

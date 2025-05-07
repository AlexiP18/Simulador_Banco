import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {
  private baseUrl = 'http://localhost:8080/API_BANCO'; // Cambiar por la URL base de tu backend

  constructor(private http: HttpClient) { }

  // Obtener información institucional
  getInformacionInstitucional(): Observable<any> {
    return this.http.get('http://localhost:8080/API_BANCO/informacion_institucional.php');
  }

  // Actualizar información institucional
  updateInformacionInstitucional(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/informacion_institucional.php`, data);
  }

  // Obtener todos los asesores
  getAsesores(): Observable<any> {
    return this.http.get(`${this.baseUrl}/registro_asesores.php`);
  }

  // Agregar un nuevo asesor
  addAsesor(asesor: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registro_asesores.php`, asesor);
  }

  // Editar un asesor existente
  updateAsesor(asesor: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/registro_asesores.php`, asesor);
  }

  // Eliminar un asesor
  deleteAsesor(id: number): Observable<any> {
    return this.http.request('DELETE', `${this.baseUrl}/registro_asesores.php`, {
      body: { id }
    });
  }

  // Actualizar el estado de un asesor
  updateEstadoAsesor(estado: { id: number; activo: boolean }): Observable<any> {
    return this.http.put(`${this.baseUrl}/registro_asesores.php`, estado);
  }

  // Obtener todos los tipos de crédito
  getCreditos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/creditos.php`);
  }

  // Agregar un nuevo tipo de crédito
  addCredito(credito: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/creditos.php`, credito);
  }

  // Actualizar un tipo de crédito existente
  updateCredito(credito: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/creditos.php`, credito);
  }

  // Eliminar un tipo de crédito
  deleteCredito(id: number): Observable<any> {
    return this.http.request('DELETE', `${this.baseUrl}/creditos.php`, {
      body: { id }
    });
  }

  // Actualizar el estado de un tipo de crédito
  updateEstadoCredito(estado: { id: number; enabled: boolean }): Observable<any> {
    return this.http.put(`${this.baseUrl}/creditos.php`, estado);
  }
}

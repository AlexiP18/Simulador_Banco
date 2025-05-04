import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  pin: string = '';
  pinValidated: boolean = false;
  numberButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  pinArray = Array(4).fill(0);

  cedula: string = '';
  usuario: string = '';
  contrasena: string = '';
  repetirContrasena: string = '';

  constructor(private http: HttpClient,private router: Router) {}

  addDigit(digit: string) {
    if (this.pin.length < 4) {
      this.pin += digit;
    }

    if (this.pin.length === 4) {
      this.verificarPin();
    }
  }

  clearPin() {
    this.pin = '';
  }

  verificarPin() {
    const payload = {
      ci: this.cedula,
      clave: this.pin
    };

    this.http.post<any>('http://localhost/API_BANCO/verifica_ci_clave.php', payload)
      .subscribe(res => {
        if (res.status === 'ok') {
          this.pinValidated = true;
        } else {
          alert('CI o clave incorrectos');
          this.clearPin();
        }
      }, error => {
        alert('Error en la conexión con el servidor');
        this.clearPin();
      });
  }

  registrarUsuario() {
    if (!this.usuario || !this.contrasena || !this.repetirContrasena) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (this.contrasena !== this.repetirContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const data = {
      ci: this.cedula,
      usuario: this.usuario,
      contrasena: this.contrasena,
      tipo_usuario: 'client'
    };

    this.http.post<any>('http://localhost/API_BANCO/registrar_usuario.php', data)
      .subscribe(res => {
        if (res.status === 'ok') {
          alert('Usuario registrado correctamente.');
          this.router.navigate(['/auth']);
        } else {
          alert('Error al registrar usuario.');
        }
      });
  }
}

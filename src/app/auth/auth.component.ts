import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  usuario = '';
  contrasena = '';

  constructor(private router: Router, private authService: AuthService) {}

  navigateToClient() {
    this.authService.login(this.usuario, this.contrasena).subscribe(res => {
      if (res.status === 'success') {
        if (res.tipo_usuario === 'client') {
          this.router.navigate(['/client']);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        alert('Credenciales incorrectas');
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

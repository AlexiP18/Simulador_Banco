import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  constructor(private router: Router) {}

  navigateToInfoInstitucional() {
    this.router.navigate(['/admin/info-institucion']);
  }

  navigateToRegistroAsesores() {
    this.router.navigate(['/admin/asesores']);
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  items: MenuItem[] = [];

  constructor(private router: Router, private route: ActivatedRoute) { }
  
  navigateToInicio() {
    this.router.navigate(['/']);
  }

  navigateToServicio() {
    this.router.navigate(['/pages/servicios']);
  }
}

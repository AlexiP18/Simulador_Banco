import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

  constructor(private router: Router) { }

  navigateToInversiones(){
    this.router.navigate(['/pages/inversiones']);
  }

  navigateToCreditos(){
    this.router.navigate(['/pages/creditos']);
  }
}

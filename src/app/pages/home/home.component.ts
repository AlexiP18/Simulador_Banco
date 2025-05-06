import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private intervalId: any;

  constructor(private router: Router) { }

  cards = [
    {
      title: 'Abre tu Cuenta de Ahorro',
      subtitle: 'Tan smart como tú',
      image: '../../../assets/images/imagen1.jpg'
    },
    {
      title: 'Solicita tu Tarjeta de Crédito',
      subtitle: 'Da el primer paso',
      image: '../../../assets/images/imagen2.jpg'
    },
    {
      title: 'Registrate en<br>WIP',
      subtitle: 'Transfiere sin costo',
      image: '../../../assets/images/imagen3.jpg'
    },
    {
      title: 'Afilia<br>tu Negocio',
      subtitle: 'Tus ideas al siguiente nivel',
      image: '../../../assets/images/imagen4.avif'
    }
  ];

  servicios = [
    {
      title: 'Seguros',
      subtitle: 'Encuentra el plan que se ajuste a lo que se necesitas..',
      icon: 'pi pi-money-bill'
    },
    {
      title: 'Prestamo de vivienda',
      subtitle: 'Descubre la mejor opcion para financiar tu casa soñada..',
      icon: 'pi pi-credit-card'
    },
    {
      title: 'Préstamo',
      subtitle: 'Solicita tu prestamo y obten una respuesta inmediata.',
      icon: 'pi pi-home'
    },
    {
      title: 'Tarjetas de crédito',
      subtitle: 'Solicita tu nueva tarjeta en pocos pasos.',
      icon: 'pi pi-mobile'
    },
    {
      title: 'Inversiones',
      subtitle: 'Simula tu inversión con un mejor interés en linea.',
      icon: 'pi pi-shield'
    },
    {
      title: 'Seguro contra fraudes',
      subtitle: 'Protege tus cuentas y tarjetas por solo $4,09 al mes.',
      icon: 'pi pi-shield'
    }
  ]

  ngAfterViewInit() {
    const bounceIcon = document.getElementById('bounce-icon');

    bounceIcon?.addEventListener('click', this.scrollToNextSection);

    this.intervalId = setInterval(() => {
      if (bounceIcon) {
        bounceIcon.classList.add('bounce');

        setTimeout(() => {
          bounceIcon.classList.remove('bounce');
        }, 500);
      }
    }, 2000);
  }



  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  private scrollToNextSection() {
    const nextSection = document.getElementById('info');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  }

  navigateToCreditos(){
    this.router.navigate(['/pages/creditos']);
  }

  navigateToInversiones(){
    this.router.navigate(['/pages/inversiones']);
  }










  currentImage = 0;

  ngOnInit() {
    setInterval(() => {
      this.currentImage = (this.currentImage + 1) % 3;
    }, 5000); // cambia cada 5 segundos
  }

}

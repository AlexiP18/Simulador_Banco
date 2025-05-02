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
      title: 'Pago de servicios',
      subtitle: 'Con tu banca online realiza tus pagos en pocos minutos.',
      icon: 'pi pi-money-bill'
    },
    {
      title: 'Difiere tus Consumos',
      subtitle: 'Elige agilmente tus consumos y difiere al plazo mas conveniente.',
      icon: 'pi pi-credit-card'
    },
    {
      title: 'Paga tu impuesto Predial',
      subtitle: 'A tiempo con débito de tu cuenta o tu tarjeta de crédito.',
      icon: 'pi pi-home'
    },
    {
      title: 'GPAY',
      subtitle: 'Agrega tus tarjetas y realiza tus pagos con la billetera de Google.',
      icon: 'pi pi-mobile'
    },
    {
      title: 'Cuida tu Dinero',
      subtitle: 'Reposición de hasta $1000 de transacciones no autorizadas.',
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
}

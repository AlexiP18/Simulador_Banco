import { Component } from '@angular/core';

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.component.html',
  styleUrls: ['./inversiones.component.scss']
})
export class InversionesComponent {
  soloNumerosRegex = /^[0-9]*$/;
  plazos: any[] = [];
  monto: any = null;
  selectedPlazo: any;
  duracionPlazo: any = null;
  tasaInteresAnual = 0.0575;
  interesGenerado: number | null = null;
  montoFinal: number | null = null;

  ngOnInit() {
    this.plazos = [
      { name: 'Días', code: '1' },
      { name: 'Meses', code: '2' },
      { name: 'Años', code: '3' }
    ];
  }

  simularInversion() {
    const montoNumerico = parseFloat(this.monto);
    const duracionPlazoNumerico = parseFloat(this.duracionPlazo);

    if (montoNumerico && duracionPlazoNumerico && this.selectedPlazo) {
      let tiempoEnAnios = 0;

      switch (this.selectedPlazo.code) {
        case '1':
          tiempoEnAnios = duracionPlazoNumerico / 365;
          break;
        case '2':
          tiempoEnAnios = duracionPlazoNumerico / 12;
          break;
        case '3':
          tiempoEnAnios = duracionPlazoNumerico;
          break;
      }

      this.interesGenerado = montoNumerico * this.tasaInteresAnual * tiempoEnAnios;
      this.montoFinal = montoNumerico + this.interesGenerado;
    } else {
      alert("Por favor ingresa el monto, el plazo y la duración de la inversión.");
    }
  }

  handleInputNumbers(event: any) {
    const inputValue = event.target.value;
    if (!this.soloNumerosRegex.test(inputValue)) {
      event.target.value = inputValue.replace(/\D/g, '');
    }
  }
}

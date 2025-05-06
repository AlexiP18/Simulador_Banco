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
  selectedPlazo: any = null;  // Mantener la selección de plazo
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

  // Método para seleccionar el tipo de plazo (Días, Meses, Años)
  selectPlazo(plazo: string) {
    this.selectedPlazo = this.plazos.find(p => p.code === plazo);
    this.simularInversion(); // Ejecutar la simulación automáticamente después de seleccionar un plazo
  }

  // Método para simular la inversión automáticamente
  simularInversion() {
    const montoNumerico = parseFloat(this.monto);
    const duracionPlazoNumerico = parseFloat(this.duracionPlazo);

    // Verificamos si todos los datos están completos antes de hacer el cálculo
    if (montoNumerico && duracionPlazoNumerico && this.selectedPlazo) {
      let tiempoEnAnios = 0;

      // Convertimos la duración al formato de años según el tipo de plazo
      switch (this.selectedPlazo.code) {
        case '1': // Días
          tiempoEnAnios = duracionPlazoNumerico / 365;
          break;
        case '2': // Meses
          tiempoEnAnios = duracionPlazoNumerico / 12;
          break;
        case '3': // Años
          tiempoEnAnios = duracionPlazoNumerico;
          break;
      }

      // Calculamos el rendimiento y el monto final
      this.interesGenerado = montoNumerico * this.tasaInteresAnual * tiempoEnAnios;
      this.montoFinal = montoNumerico + this.interesGenerado;
    } else {
      this.interesGenerado = null;
      this.montoFinal = null;
    }
  }

  // Método para manejar solo números en los campos
  handleInputNumbers(event: any) {
    const inputValue = event.target.value;
    if (!this.soloNumerosRegex.test(inputValue)) {
      event.target.value = inputValue.replace(/\D/g, '');
    }
  }
}

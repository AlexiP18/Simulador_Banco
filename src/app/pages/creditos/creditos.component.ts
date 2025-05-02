import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrl: './creditos.component.scss'
})
export class CreditosComponent {

  creditos: any[] = [];
  plazos: any[] = [];
  montoSolicitado = null;
  metodos: any[] = [];
  cuotas: any[] = [];
  tasaSeguro = 0.14 / 100;
  selectedCredito: any;
  selectedPlazo: any;
  selectedMetodo: any;
  soloNumerosRegex = /^[0-9]*$/;

  ngOnInit() {
    this.creditos = [
      { name: 'Preciso', interesA: 0.156, interesM: 0.156 / 12 },
      { name: 'Linea Abierta', interesA: 0.13, interesM: 0.13 / 12 },
      { name: 'Hipotecario Vivienda', interesA: 0.1175, interesM: 0.1175 / 12 },
      { name: 'Vivienda de Interes Público', interesA: 0.0487, interesM: 0.0487 / 12 },
      { name: 'Vivienda de Interes Social', interesA: 0.0487, interesM: 0.0487 / 12 },
      { name: 'Educación Superior', interesA: 0.09, interesM: 0.09 / 12 }
    ];

    this.plazos = [
      { name: '6 meses', value: 6 },
      { name: '7 meses', value: 7 },
      { name: '8 meses', value: 8 },
      { name: '9 meses', value: 9 },
      { name: '10 meses', value: 10 },
      { name: '11 meses', value: 11 },
      { name: '12 meses', value: 12 },
      { name: '18 meses', value: 18 },
      { name: '24 meses', value: 24 },
      { name: '30 meses', value: 30 },
      { name: '36 meses', value: 36 },
      { name: '42 meses', value: 42 },
      { name: '48 meses', value: 48 },
      { name: '54 meses', value: 54 },
      { name: '60 meses', value: 60 },
      { name: '66 meses', value: 66 },
      { name: '72 meses', value: 72 },
      { name: '78 meses', value: 78 },
      { name: '84 meses', value: 84 },
      { name: '90 meses', value: 90 },
      { name: '96 meses', value: 96 },
      { name: '102 meses', value: 102 },
      { name: '108 meses', value: 108 },
      { name: '114 meses', value: 114 },
      { name: '120 meses', value: 120 },
      { name: '126 meses', value: 126 }
    ];

    this.metodos = [
      { name: 'Método Frances', code: '1' },
      { name: 'Método Alemán', code: '2' }
    ];
  }

  simularCredito() {
    if (this.selectedCredito && this.selectedPlazo && this.montoSolicitado) {
      const interesA = this.selectedCredito.interesA;
      const interesM = this.selectedCredito.interesM;
      const plazo = this.selectedPlazo.value;
      const metodo = this.selectedMetodo ? this.selectedMetodo.name : '';

      if (metodo === 'Método Frances') {
        this.cuotas = this.calcularCuotaFrances(this.montoSolicitado, interesA, interesM, plazo);
      } else if (metodo === 'Método Alemán') {
        this.cuotas = this.calcularCuotaAleman(this.montoSolicitado, interesA, interesM, plazo);
      }
    } else {
      alert("Por favor complete todos los campos.");
    }
  }

  calcularCuotaFrances(monto: number, interesA: number, interesM: number, plazo: number): any[] {
    const cuotaMensual = (monto * interesM) / (1 - Math.pow(1 + interesM, -plazo));
    let saldo = monto;
    const cuotas = [];

    for (let i = 1; i <= plazo; i++) {
      const interesMensual = (saldo * interesA) / 12;
      const seguro = saldo * this.tasaSeguro;
      const capital = cuotaMensual - interesMensual;
      saldo -= capital;

      cuotas.push({
        code: i,
        name: cuotaMensual.toFixed(2),
        seguro: seguro.toFixed(2),
        category: interesMensual.toFixed(2),
        quantity: capital.toFixed(2),
        saldo: saldo.toFixed(2)
      });
    }

    return cuotas;
  }

  calcularCuotaAleman(monto: number, interesA: number, interesM: number, plazo: number): any[] {
    const capitalMensual = monto / plazo;
    let saldo = monto;
    const cuotas = [];

    for (let i = 1; i <= plazo; i++) {
      const interesMensual = (saldo * interesA) / 12;
      const seguro = saldo * this.tasaSeguro;
      const cuotaMensual = capitalMensual + interesMensual;
      saldo -= capitalMensual;
      cuotas.push({
        code: i,
        name: cuotaMensual.toFixed(2),
        seguro: seguro.toFixed(2),
        category: interesMensual.toFixed(2),
        quantity: capitalMensual.toFixed(2),
        saldo: saldo.toFixed(2)
      });
    }

    return cuotas;
  }

  descargarTabla() {
    const doc = new jsPDF('l');

    const metodoTitulo = this.selectedMetodo === 'Francesa' ? 'Tabla de Amortización - Método Francés' : 'Tabla de Amortización - Método Alemán';
    doc.setFontSize(20);
    const titleWidth = doc.getTextWidth(metodoTitulo);
    const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(metodoTitulo, titleX, 20);

    doc.setFontSize(12);
    const headers = ['No.', 'Cuota', 'Seguro', 'Interés', 'Capital', 'Saldo'];
    const headerWidths = [20, 40, 40, 40, 40, 40];
    const totalWidth = headerWidths.reduce((a, b) => a + b, 0);
    const startY = 30;
    const startX = (doc.internal.pageSize.getWidth() - totalWidth) / 2;

    let x = startX;
    headers.forEach((header, index) => {
      doc.rect(x, startY, headerWidths[index], 10);
      doc.text(header, x + 5, startY + 7);
      x += headerWidths[index];
    });

    let y = startY + 10;
    this.cuotas.forEach((cuota, index) => {
      x = startX;
      doc.rect(x, y, headerWidths[0], 10);
      doc.text((index + 1).toString(), x + 5, y + 7);

      for (let i = 1; i < headers.length; i++) {
        x += headerWidths[i - 1];
        doc.rect(x, y, headerWidths[i], 10);
        const value = i === 1 ? cuota.name : i === 2 ? cuota.seguro : i === 3 ? cuota.category.toString() : i === 4 ? cuota.quantity.toString() : cuota.saldo.toString();
        doc.text(value, x + 5, y + 7);
      }
      y += 10;
    });

    doc.save('tabla_amortizacion.pdf');
  }


  handleInputNumbers(event: any) {
    const inputValue = event.target.value;
    if (!this.soloNumerosRegex.test(inputValue)) {
      event.target.value = inputValue.replace(/\D/g, '');
    }
  }
}

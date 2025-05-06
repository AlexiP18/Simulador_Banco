import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.scss']
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

  contenidoVisible: boolean = false;  
  mesesSolicitado = null;
  tipoInteres="";


  ngOnInit() {
    // Llenar las listas de créditos, plazos y métodos
    this.creditos = [
      { name: 'hipotecario', interesA: 0.075, interesM: 0.075 / 12 },
      { name: 'vip y vis', interesA: 0.0487, interesM: 0.0487 / 12 },
      { name: 'hipotecario para construccion', interesA: 0.075, interesM: 0.075 / 12 },
      { name: 'compra de terreno', interesA: 0.075, interesM: 0.075 / 12 },

      { name: 'Preciso', interesA: 0.156, interesM: 0.156 / 12 },
      { name: 'Linea Abierta', interesA: 0.13, interesM: 0.13 / 12 },
      { name: 'Hipotecario Vivienda', interesA: 0.1175, interesM: 0.1175 / 12 },
      { name: 'Vivienda de Interes Público', interesA: 0.0487, interesM: 0.0487 / 12 },
      { name: 'Vivienda de Interes Social', interesA: 0.0487, interesM: 0.0487 / 12 },
      { name: 'Educación Superior', interesA: 0.09, interesM: 0.09 / 12 }
    ];



    this.metodos = [
      { name: 'Método Frances', code: '1' },
      { name: 'Método Alemán', code: '2' }
    ];
  }

  // Método para alternar la visibilidad del contenido
  toggleContenido(nombreCredito: string) {
    const credito = this.creditos.find(c => c.name === nombreCredito);
    if (credito) {
      this.selectedCredito = credito;
      this.tipoInteres = credito.interes;
      this.contenidoVisible = true;
    }
  }
  

  simularCredito() {
    if (this.montoSolicitado && this.mesesSolicitado) {
      const interesA = this.selectedCredito.interesA;
      const interesM = this.selectedCredito.interesM;

      const metodo = this.selectedMetodo ? this.selectedMetodo.name : '';

      if (metodo === 'Método Frances') {
        this.cuotas = this.calcularCuotaFrances(this.montoSolicitado, interesA, interesM, this.mesesSolicitado);
      } else if (metodo === 'Método Alemán') {
        this.cuotas = this.calcularCuotaAleman(this.montoSolicitado, interesA, interesM, this.mesesSolicitado);
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

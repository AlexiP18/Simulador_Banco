import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreditosService } from '../../services/creditos.service';

interface CreditType {
  id: number;
  name: string;
  interestRate: number;
  maxTerm: number;
  termUnit: 'meses' | 'años';
  additionalCharges: AdditionalCharge[];
  enabled: boolean;
  selected: boolean;
}

interface AdditionalCharge {
  id: number;
  name: string;
  amount: number;
  selected: boolean;
}

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrl: './creditos.component.scss'
})
export class CreditosComponent implements OnInit {
  // Form models
  newCredit: {
    name: string;
    interestRate: number;
    maxTerm: number;
    termUnit: 'meses' | 'años';
  } = {
    name: '',
    interestRate: 15,
    maxTerm: 60,
    termUnit: 'meses'
  };

  newCharge: {
    name: string;
    amount: number;
  } = {
    name: '',
    amount: 0
  };

  // Data collections
  creditTypes: CreditType[] = [];
  selectedCreditAdditionalCharges: AdditionalCharge[] = [];

  // Add this property to store the predefined interest rates
  interestRates: number[] = [5, 10, 15, 20, 25, 30, 35, 40];

  // Add a property to track the credit being edited
  editingCredit: CreditType | null = null;

  // Properties for delete modal
  showDeleteModal = false;
  creditToDelete: CreditType | null = null;

  // Properties for charges modal
  showChargesModal = false;
  selectedCreditName = '';

  constructor(private creditosService: CreditosService) { }

  ngOnInit(): void {
    this.cargarCreditos();

    // Initialize with sample data if needed (you can keep this for development)
    // this.creditTypes = [
    //   {
    //     id: 1,
    //     name: 'Educativo',
    //     interestRate: 18,
    //     maxTerm: 136,
    //     termUnit: 'meses',
    //     additionalCharges: [
    //       { id: 1, name: 'Solca', amount: 200, selected: true },
    //       { id: 2, name: 'Seguro', amount: 150, selected: true },
    //       { id: 3, name: 'Bomberos', amount: 75, selected: true },
    //       { id: 4, name: 'Gastos Administrativos', amount: 120, selected: true },
    //       { id: 5, name: 'Seguro de Desgravamen', amount: 180, selected: true },
    //       { id: 6, name: 'Comisión por Desembolso', amount: 95, selected: true },
    //       { id: 7, name: 'Seguro de Vida', amount: 210, selected: true }
    //     ],
    //     enabled: true,
    //     selected: true
    //   },
    //   {
    //     id: 2,
    //     name: 'Emprendimiento',
    //     interestRate: 15,
    //     maxTerm: 200,
    //     termUnit: 'meses',
    //     additionalCharges: [
    //       { id: 1, name: 'Solca', amount: 200, selected: true },
    //       { id: 3, name: 'Bomberos', amount: 75, selected: true }
    //     ],
    //     enabled: false,
    //     selected: true
    //   },
    //   {
    //     id: 3,
    //     name: 'Microempresa',
    //     interestRate: 10,
    //     maxTerm: 180,
    //     termUnit: 'meses',
    //     additionalCharges: [
    //       { id: 1, name: 'Solca', amount: 200, selected: true },
    //       { id: 3, name: 'Bomberos', amount: 75, selected: true },
    //       { id: 4, name: 'Seguro', amount: 500, selected: true }
    //     ],
    //     enabled: true,
    //     selected: true
    //   },
    //   // Agregar más filas para demostrar el scroll vertical
    //   {
    //     id: 4,
    //     name: 'Crédito Hipotecario',
    //     interestRate: 8.5,
    //     maxTerm: 20,
    //     termUnit: 'años',
    //     additionalCharges: [
    //       { id: 1, name: 'Avalúo', amount: 350, selected: true },
    //       { id: 2, name: 'Gastos Legales', amount: 450, selected: true }
    //     ],
    //     enabled: true,
    //     selected: true
    //   },
    //   {
    //     id: 5,
    //     name: 'Crédito Automotriz',
    //     interestRate: 12.75,
    //     maxTerm: 72,
    //     termUnit: 'meses',
    //     additionalCharges: [
    //       { id: 1, name: 'Seguro del Vehículo', amount: 650, selected: true },
    //       { id: 2, name: 'Comisión', amount: 200, selected: true }
    //     ],
    //     enabled: true,
    //     selected: true
    //   },
    //   {
    //     id: 6,
    //     name: 'Crédito de Consumo',
    //     interestRate: 16.25,
    //     maxTerm: 48,
    //     termUnit: 'meses',
    //     additionalCharges: [
    //       { id: 1, name: 'Seguro', amount: 125, selected: true }
    //     ],
    //     enabled: true,
    //     selected: true
    //   },
    //   {
    //     id: 7,
    //     name: 'Crédito Agrícola',
    //     interestRate: 9.3,
    //     maxTerm: 10,
    //     termUnit: 'años',
    //     additionalCharges: [
    //       { id: 1, name: 'Seguro Agrícola', amount: 300, selected: true },
    //       { id: 2, name: 'Estudio Técnico', amount: 250, selected: true }
    //     ],
    //     enabled: false,
    //     selected: true
    //   },
    //   {
    //     id: 8,
    //     name: 'Microcrédito',
    //     interestRate: 22.5,
    //     maxTerm: 36,
    //     termUnit: 'meses',
    //     additionalCharges: [
    //       { id: 1, name: 'Capacitación', amount: 50, selected: true }
    //     ],
    //     enabled: true,
    //     selected: true
    //   },
    //   {
    //     id: 9,
    //     name: 'Crédito para PYMES',
    //     interestRate: 14.8,
    //     maxTerm: 8,
    //     termUnit: 'años',
    //     additionalCharges: [
    //       { id: 1, name: 'Estudio Financiero', amount: 480, selected: true },
    //       { id: 2, name: 'Seguro', amount: 350, selected: true }
    //     ],
    //     enabled: true,
    //     selected: true
    //   },
    //   {
    //     id: 10,
    //     name: 'Crédito para Vivienda',
    //     interestRate: 7.9,
    //     maxTerm: 25,
    //     termUnit: 'años',
    //     additionalCharges: [
    //       { id: 1, name: 'Gastos Notariales', amount: 400, selected: true },
    //       { id: 2, name: 'Seguro de Inmueble', amount: 550, selected: true }
    //     ],
    //     enabled: true,
    //     selected: true
    //   }
    // ];

    // Show the first credit's additional charges by default
    this.selectedCreditAdditionalCharges = [
      { id: 1, name: 'Solca', amount: 200, selected: true },
      { id: 2, name: 'Bomberos', amount: 75, selected: true },
      { id: 3, name: 'Seguro', amount: 500, selected: true }
    ];
  }

  // Método para cargar tipos de crédito desde el backend
  cargarCreditos(): void {
    this.creditosService.getCreditos().subscribe(response => {
      if (response && response.data) {
        this.creditTypes = response.data;
      }
    }, error => {
      console.error('Error al cargar los créditos:', error);
    });
  }

  // Add a new credit type
  addCreditType(): void {
    if (!this.newCredit.name || this.newCredit.interestRate <= 0 || this.newCredit.maxTerm <= 0) {
      // Basic validation
      alert('Por favor complete todos los campos correctamente');
      return;
    }

    if (this.editingCredit) {
      // Update existing credit
      const creditoActualizado = {
        id: this.editingCredit.id,
        name: this.newCredit.name,
        interestRate: this.newCredit.interestRate,
        maxTerm: this.newCredit.maxTerm,
        termUnit: this.newCredit.termUnit,
        additionalCharges: this.selectedCreditAdditionalCharges,
        enabled: this.editingCredit.enabled
      };

      this.creditosService.updateCredito(creditoActualizado).subscribe(
        response => {
          this.cargarCreditos();
          // Clear editing state
          this.editingCredit = null;
          this.resetCreditForm();
        },
        error => {
          console.error('Error al actualizar el crédito:', error);
        }
      );
    } else {
      // Add new credit
      const nuevoCredito = {
        name: this.newCredit.name,
        interestRate: this.newCredit.interestRate,
        maxTerm: this.newCredit.maxTerm,
        termUnit: this.newCredit.termUnit,
        additionalCharges: this.selectedCreditAdditionalCharges,
        enabled: true
      };

      this.creditosService.addCredito(nuevoCredito).subscribe(
        response => {
          this.cargarCreditos();
          this.resetCreditForm();
        },
        error => {
          console.error('Error al agregar el crédito:', error);
        }
      );
    }

    // Reset additional charges
    this.selectedCreditAdditionalCharges = [];
  }

  // View additional charges for a specific credit
  viewAdditionalCharges(credit: CreditType): void {
    this.selectedCreditAdditionalCharges = [...credit.additionalCharges];
    this.selectedCreditName = credit.name;
    this.showChargesModal = true;
  }

  /**
   * Closes the additional charges modal
   */
  closeChargesModal(event: Event): void {
    // Only close if clicking the overlay or close button
    if (
      (event.target as HTMLElement).classList.contains('modal-overlay') ||
      (event.target as HTMLElement).closest('.close-btn')
    ) {
      this.showChargesModal = false;
      event.stopPropagation();
    }
  }

  // Toggle credit selection
  toggleCreditSelection(credit: CreditType): void {
    credit.selected = !credit.selected;
  }

  // Toggle credit enabled status
  toggleCreditEnabled(credit: CreditType): void {
    if (credit.id) {
      credit.enabled = !credit.enabled;
      const estadoActualizado = { id: credit.id, enabled: credit.enabled };

      this.creditosService.updateEstadoCredito(estadoActualizado).subscribe(
        response => {
          console.log(`Estado del crédito con ID ${credit.id} actualizado a ${credit.enabled}`);
        },
        error => {
          console.error('Error al actualizar el estado del crédito:', error);
          // Revert the change if there was an error
          credit.enabled = !credit.enabled;
        }
      );
    }
  }

  // Toggle all credits selection
  toggleAllCreditsSelection(event: any): void {
    const isChecked = event.target.checked;
    this.creditTypes.forEach(credit => credit.selected = isChecked);
  }

  // Toggle additional charge selection
  toggleChargeSelection(charge: AdditionalCharge): void {
    charge.selected = !charge.selected;
  }

  // Toggle all charges selection
  toggleAllChargesSelection(event: any): void {
    const isChecked = event.target.checked;
    this.selectedCreditAdditionalCharges.forEach(charge => charge.selected = isChecked);
  }

  // Add this method to handle the dropdown change
  setInterestRate(event: any): void {
    const value = event.target.value;
    if (value) {
      this.newCredit.interestRate = Number(value);
    }
  }


  /**
   * Caps the interest rate at the maximum value (50) or minimum (0) when the user leaves the input field.
   * Also formats to 2 decimal places if needed.
   */
  capInterestRate(): void {
    let value = this.newCredit.interestRate;

    if (value === null || value === undefined || isNaN(value)) {
      value = 0; // Default to 0 if invalid or empty
    } else if (value > 50) {
      value = 50;
    } else if (value < 0) {
      value = 0;
    }

    // Optionally format to 2 decimal places on blur
    // this.newCredit.interestRate = parseFloat(value.toFixed(2));
    this.newCredit.interestRate = value; // Keep as number
  }

  /**
   * Basic validation on keydown to prevent invalid characters and multiple dots.
   */
  validateNumberInput(event: KeyboardEvent): boolean {
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;

    // Allow: backspace, delete, tab, escape, enter, arrow keys, home, end
    const navigationKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'Home', 'End'
    ];
    if (navigationKeys.includes(event.key)) {
      return true;
    }

    // Allow digits
    if (/^\d$/.test(event.key)) {
      return true;
    }

    // Allow a single decimal point
    if (event.key === '.' && !currentValue.includes('.')) {
      return true;
    }

    // Block all other keys
    event.preventDefault();
    return false;
  }

  /**
   * Handles the input event to enforce max value and decimal places immediately.
   */
  handleInterestRateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove any non-numeric characters except the first dot
    value = value.replace(/[^0-9.]/g, (match, offset) => {
      // Allow the first dot, replace subsequent dots
      return match === '.' && value.indexOf('.') === offset ? '.' : '';
    });

    // Check decimal places limit (max 2 decimal places)
    const parts = value.split('.');
    if (parts.length > 1 && parts[1].length > 2) {
      value = `${parts[0]}.${parts[1].substring(0, 2)}`;
    }

    // Check max value
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 50) {
      value = '50'; // Cap at 50 immediately
    }

    // Update the input value and the model if necessary
    if (input.value !== value) {
      input.value = value;
      // Manually update the model as [(ngModel)] might lag
      this.newCredit.interestRate = parseFloat(value) || 0;
    } else {
      // Ensure model is updated even if value string didn't change (e.g., typing '50.')
      this.newCredit.interestRate = parseFloat(value) || 0;
    }
  }

  /**
   * Handles paste events to ensure only valid numbers are pasted and capped.
   */
  handlePaste(event: ClipboardEvent): void {
    event.preventDefault(); // Prevent default paste
    const clipboardData = event.clipboardData;
    let pastedText = clipboardData?.getData('text');

    if (pastedText) {
      // Clean pasted text: allow only numbers and the first dot
      pastedText = pastedText.replace(/[^0-9.]/g, (match, offset) => {
        return match === '.' && pastedText?.indexOf('.') === offset ? '.' : '';
      });

      // Check decimal places
      const parts = pastedText.split('.');
      if (parts.length > 1 && parts[1].length > 2) {
        pastedText = `${parts[0]}.${parts[1].substring(0, 2)}`;
      }

      // Check max value
      let numValue = parseFloat(pastedText);
      if (!isNaN(numValue)) {
        if (numValue > 50) {
          numValue = 50;
        } else if (numValue < 0) {
          numValue = 0;
        }
        // Update model and input
        this.newCredit.interestRate = numValue;
        (event.target as HTMLInputElement).value = numValue.toString();
      } else {
        // Handle case where pasted text is not a valid number after cleaning (e.g., just '.')
        this.newCredit.interestRate = 0;
        (event.target as HTMLInputElement).value = '0';
      }
    }
  }

  termUnit: 'años' | 'meses' = 'años'; // Default to 'años'

  /**
   * Handles the input event for the max term input to enforce valid values.
   */
  handleMaxTermInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = parseInt(input.value, 10);

    if (isNaN(value) || value < 1) {
      value = 1; // Minimum value is 1
    } else if (this.termUnit === 'años' && value > 50) {
      value = 50; // Maximum value for years is 50
    } else if (this.termUnit === 'meses' && value > 600) {
      value = 600; // Maximum value for months is 600
    }

    input.value = value.toString();
    this.newCredit.maxTerm = value;
  }

  /**
   * Updates the max term value and unit when the radio button changes.
   * Converts the value between years and months.
   */
  updateMaxTermUnit(unit: 'años' | 'meses'): void {
    const currentValue = this.newCredit.maxTerm;
    let convertedValue: number;

    if (unit === 'años' && this.termUnit === 'meses') {
      // Convert months to years (allow decimals for display)
      convertedValue = parseFloat((currentValue / 12).toFixed(2));
      // Ensure it's within the valid range
      convertedValue = Math.min(convertedValue, 50);
    } else if (unit === 'meses' && this.termUnit === 'años') {
      // Convert years to months (integer)
      convertedValue = Math.round(currentValue * 12);
      // Ensure it's within the valid range
      convertedValue = Math.min(convertedValue, 600);
    } else {
      convertedValue = currentValue; // Same unit, no conversion needed
    }

    // Update the term unit first
    this.termUnit = unit;

    // Then update the max term value
    this.newCredit.maxTerm = convertedValue;

    // Ensure model binding is up to date
    setTimeout(() => {
      // Force Angular to detect the changes
      this.newCredit.maxTerm = convertedValue;
    });
  }

  /**
   * Caps the charge amount at the maximum value (5000) or minimum (0) when the user leaves the input field.
   */
  capChargeAmount(): void {
    let value = this.newCharge.amount;

    if (value === null || value === undefined || isNaN(value)) {
      value = 0; // Default to 0 if invalid or empty
    } else if (value > 5000) {
      value = 5000;
    } else if (value < 0) {
      value = 0;
    }

    this.newCharge.amount = value; // Keep as number
  }

  /**
   * Handles the input event for the charge amount to enforce max value and decimal places immediately.
   */
  handleChargeAmountInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove any non-numeric characters except the first dot
    value = value.replace(/[^0-9.]/g, (match, offset) => {
      // Allow the first dot, replace subsequent dots
      return match === '.' && value.indexOf('.') === offset ? '.' : '';
    });

    // Check decimal places limit (max 2 decimal places)
    const parts = value.split('.');
    if (parts.length > 1 && parts[1].length > 2) {
      value = `${parts[0]}.${parts[1].substring(0, 2)}`;
    }

    // Check max value
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 5000) {
      value = '5000'; // Cap at 5000 immediately
    }

    // Update the input value and the model if necessary
    if (input.value !== value) {
      input.value = value;
      // Manually update the model as [(ngModel)] might lag
      this.newCharge.amount = parseFloat(value) || 0;
    } else {
      // Ensure model is updated even if value string didn't change
      this.newCharge.amount = parseFloat(value) || 0;
    }
  }

  editingCharge: AdditionalCharge | null = null; // Track the charge being edited

  /**
   * Deletes a charge from the list.
   */
  deleteCharge(charge: AdditionalCharge): void {
    const index = this.selectedCreditAdditionalCharges.indexOf(charge);
    if (index > -1) {
      this.selectedCreditAdditionalCharges.splice(index, 1);
    }
  }

  /**
   * Prepares a charge for editing by populating the form inputs.
   */
  editCharge(charge: AdditionalCharge): void {
    this.editingCharge = charge;
    this.newCharge.name = charge.name;
    this.newCharge.amount = charge.amount;
  }

  /**
   * Adds or updates a charge depending on the editing state.
   */
  addAdditionalCharge(): void {
    if (!this.newCharge.name || this.newCharge.amount <= 0) {
      alert('Por favor complete el nombre y monto del cargo adicional');
      return;
    }

    if (this.editingCharge) {
      // Update the existing charge
      this.editingCharge.name = this.newCharge.name;
      this.editingCharge.amount = this.newCharge.amount;
      this.editingCharge = null; // Clear editing state
    } else {
      // Add a new charge
      const newId = this.selectedCreditAdditionalCharges.length > 0
        ? Math.max(...this.selectedCreditAdditionalCharges.map(c => c.id)) + 1
        : 1;

      const newCharge: AdditionalCharge = {
        id: newId,
        name: this.newCharge.name,
        amount: this.newCharge.amount,
        selected: true
      };

      this.selectedCreditAdditionalCharges.push(newCharge);
    }

    // Reset form
    this.newCharge = {
      name: '',
      amount: 0
    };
  }

  /**
   * Prepares a credit for editing by populating the form inputs.
   */
  editCredit(credit: CreditType): void {
    this.editingCredit = credit;

    // Populate the form with the selected credit's data
    this.newCredit = {
      name: credit.name,
      interestRate: credit.interestRate,
      maxTerm: credit.maxTerm,
      termUnit: credit.termUnit
    };

    // Update the term unit radio button
    this.termUnit = credit.termUnit;

    // Load the additional charges of the selected credit
    this.selectedCreditAdditionalCharges = [...credit.additionalCharges];

    // Scroll to the top of the form for better UX
    const formsContainer = document.querySelector('.forms-container');
    if (formsContainer) {
      formsContainer.scrollTop = 0;
    }
  }

  /**
   * Opens the delete confirmation modal
   */
  deleteCredit(credit: CreditType): void {
    this.creditToDelete = credit;
    this.showDeleteModal = true;
  }

  /**
   * Closes the delete confirmation modal
   */
  closeDeleteModal(event: Event): void {
    // Only close if clicking the overlay or close button
    if (
      (event.target as HTMLElement).classList.contains('modal-overlay') ||
      (event.target as HTMLElement).closest('.close-btn') ||
      (event.target as HTMLElement).classList.contains('btn-cancelar')
    ) {
      this.showDeleteModal = false;
      this.creditToDelete = null;
      event.stopPropagation();
    }
  }

  /**
   * Confirms credit deletion after modal confirmation
   */
  confirmDeleteCredit(): void {
    if (this.creditToDelete && this.creditToDelete.id) {
      this.creditosService.deleteCredito(this.creditToDelete.id).subscribe(
        response => {
          this.cargarCreditos();
          // Close the modal
          this.showDeleteModal = false;
          this.creditToDelete = null;
        },
        error => {
          console.error('Error al eliminar el crédito:', error);
          this.showDeleteModal = false;
          this.creditToDelete = null;
        }
      );
    }
  }

  /**
   * Resets the credit form to its default state.
   */
  resetCreditForm(): void {
    this.newCredit = {
      name: '',
      interestRate: 15,
      maxTerm: 60,
      termUnit: 'meses'
    };
    this.termUnit = 'años';
    this.editingCredit = null;
  }
}

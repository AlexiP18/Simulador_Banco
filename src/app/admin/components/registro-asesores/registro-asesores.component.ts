import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Asesor {
  nombre: string;
  apellido: string;
  cargo: string;
  activo: boolean;
  seleccionado: boolean;
}

@Component({
  selector: 'app-registro-asesores',
  templateUrl: './registro-asesores.component.html',
  styleUrl: './registro-asesores.component.scss'
})
export class RegistroAsesoresComponent {
  // Formulario para crear/editar asesores
  asesorForm: Partial<Asesor> = {
    nombre: '',
    apellido: '',
    cargo: '',
    activo: true
  };

  // Datos de muestra para la tabla (aumentado a 8 filas)
  asesores: Asesor[] = [
    { nombre: 'Alex Rodriguez', apellido: 'Rodriguez', cargo: 'Asesor', activo: true, seleccionado: false },
    { nombre: 'Jose Perez', apellido: 'Perez', cargo: 'Cajero', activo: false, seleccionado: false },
    { nombre: 'Juan Garcia', apellido: 'Garcia', cargo: 'Asesor', activo: true, seleccionado: false },
    { nombre: 'Maria Gomez', apellido: 'Gomez', cargo: 'Asesor', activo: true, seleccionado: false },
    { nombre: 'Carlos Sanchez', apellido: 'Sanchez', cargo: 'Cajero', activo: false, seleccionado: false },
    { nombre: 'Laura Martinez', apellido: 'Martinez', cargo: 'Asesor', activo: true, seleccionado: false },
    { nombre: 'Pedro Ramirez', apellido: 'Ramirez', cargo: 'Cajero', activo: true, seleccionado: false },
    { nombre: 'Ana Fernandez', apellido: 'Fernandez', cargo: 'Asesor', activo: false, seleccionado: false }
  ];

  modoEdicion: boolean = false;
  indiceEdicion: number = -1;
  todosSeleccionados: boolean = false;

  // Variables para el modal de eliminación
  mostrarModalEliminar: boolean = false;
  asesorAEliminar: number | null = null;

  // Método para guardar o actualizar un asesor
  guardar(): void {
    if (this.asesorForm.nombre && this.asesorForm.apellido && this.asesorForm.cargo) {
      const nuevoAsesor: Asesor = {
        nombre: `${this.asesorForm.nombre} ${this.asesorForm.apellido}`,
        apellido: this.asesorForm.apellido || '',
        cargo: this.asesorForm.cargo || '',
        activo: this.asesorForm.activo || false,
        seleccionado: false
      };

      if (this.modoEdicion && this.indiceEdicion > -1) {
        // Actualizar asesor existente
        this.asesores[this.indiceEdicion] = nuevoAsesor;
        this.modoEdicion = false;
        this.indiceEdicion = -1;
      } else {
        // Añadir nuevo asesor
        this.asesores.push(nuevoAsesor);
      }

      // Limpiar formulario
      this.resetForm();
    }
  }

  // Método para editar un asesor
  editar(asesor: Asesor): void {
    const nombreParts = asesor.nombre.split(' ');
    this.asesorForm = {
      nombre: nombreParts[0],
      apellido: asesor.apellido,
      cargo: asesor.cargo,
      activo: asesor.activo
    };

    this.modoEdicion = true;
    this.indiceEdicion = this.asesores.findIndex(a => a === asesor);
  }

  // Método para eliminar un asesor (ahora muestra el modal)
  eliminar(index: number): void {
    this.asesorAEliminar = index;
    this.mostrarModalEliminar = true;
  }

  // Método para confirmar la eliminación
  confirmarEliminar(): void {
    if (this.asesorAEliminar !== null) {
      // Eliminar el asesor del array
      this.asesores.splice(this.asesorAEliminar, 1);

      // Si estábamos editando el asesor que se eliminó, limpiamos el formulario
      if (this.modoEdicion && this.indiceEdicion === this.asesorAEliminar) {
        this.resetForm();
      }

      // Cerrar el modal
      this.cancelarEliminar();
    }
  }

  // Método para cancelar la eliminación
  cancelarEliminar(): void {
    this.mostrarModalEliminar = false;
    this.asesorAEliminar = null;
  }

  // Método para seleccionar/deseleccionar todos los asesores
  seleccionarTodos(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.todosSeleccionados = isChecked;
    this.asesores.forEach(asesor => asesor.seleccionado = isChecked);
  }

  // Método para verificar si todos los asesores están seleccionados
  verificarSeleccionTodos(): void {
    this.todosSeleccionados = this.asesores.every(asesor => asesor.seleccionado);
  }

  // Método para limpiar el formulario
  resetForm(): void {
    this.asesorForm = {
      nombre: '',
      apellido: '',
      cargo: '',
      activo: true
    };
    this.modoEdicion = false;
    this.indiceEdicion = -1;
  }
}

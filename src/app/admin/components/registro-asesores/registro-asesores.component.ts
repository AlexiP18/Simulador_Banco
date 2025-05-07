import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreditosService } from '../../services/creditos.service';

interface Asesor {
  id?: number | null;
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

  constructor(private creditosService: CreditosService) {
    this.cargarAsesores();
  }

  // Método para cargar asesores desde el backend
  cargarAsesores(): void {
    this.creditosService.getAsesores().subscribe(response => {
      this.asesores = (response.data || []).map((asesor: any) => ({
        ...asesor,
        activo: asesor.enabled === 1 // Convertir 'enabled' a booleano
      }));
    });
  }

  // Método para guardar o actualizar un asesor
  guardar(): void {
    if (this.asesorForm.nombre && this.asesorForm.apellido && this.asesorForm.cargo) {
      const nuevoAsesor = {
        id: this.modoEdicion ? this.asesores[this.indiceEdicion].id : null,
        nombre: this.asesorForm.nombre,
        apellido: this.asesorForm.apellido,
        cargo: this.asesorForm.cargo,
        enabled: this.asesorForm.activo ? 1 : 0
      };

      if (this.modoEdicion) {
        this.creditosService.updateAsesor(nuevoAsesor).subscribe(() => {
          this.cargarAsesores();
          this.resetForm();
        });
      } else {
        this.creditosService.addAsesor(nuevoAsesor).subscribe(() => {
          this.cargarAsesores();
          this.resetForm();
        });
      }
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
    const asesor = this.asesores[index];
    console.log('Intentando eliminar asesor:', asesor);

    if (asesor && asesor.id !== undefined && asesor.id !== null) {
      console.log('ID del asesor a eliminar:', asesor.id, 'tipo:', typeof asesor.id);
      this.asesorAEliminar = index;
      this.mostrarModalEliminar = true;
    } else {
      console.error('No se puede eliminar asesor sin ID válido. Asesor:', asesor);
    }
  }

  // Método para confirmar la eliminación
  confirmarEliminar(): void {
    if (this.asesorAEliminar !== null) {
      const asesor = this.asesores[this.asesorAEliminar];
      if (!asesor) {
        console.error('Asesor no encontrado en el índice:', this.asesorAEliminar);
        this.cancelarEliminar();
        return;
      }

      const id = asesor.id;
      console.log('Confirmando eliminación de asesor con ID:', id, 'tipo:', typeof id);

      if (id !== undefined && id !== null) {
        // Convertir explícitamente el ID a número si es necesario
        const numericId = Number(id);

        if (!isNaN(numericId)) {
          console.log('Enviando solicitud de eliminación para ID:', numericId);
          this.creditosService.deleteAsesor(numericId).subscribe(
            response => {
              console.log('Respuesta del servidor:', response);
              this.cargarAsesores();
              this.cancelarEliminar();
            },
            error => {
              console.error('Error al eliminar asesor:', error);
              this.cancelarEliminar();
            }
          );
        } else {
          console.error('ID no es un número válido:', id);
          this.cancelarEliminar();
        }
      } else {
        console.error('No se puede eliminar asesor con ID inválido');
        this.cancelarEliminar();
      }
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

  // Método para actualizar el estado del asesor
  actualizarEstado(asesor: Asesor): void {
    if (asesor.id) {
      const estadoActualizado = { id: asesor.id, activo: asesor.activo };
      this.creditosService.updateEstadoAsesor(estadoActualizado).subscribe(() => {
        console.log(`Estado del asesor con ID ${asesor.id} actualizado a ${asesor.activo}`);
      });
    } else {
      console.error('No se puede actualizar el estado de un asesor sin ID');
    }
  }
}

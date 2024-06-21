import { Component, Pipe } from '@angular/core';
import { ServiceApiService } from '../../services/service-api.service';
import { Cliente } from '../../models/Cliente';
import { Router } from '@angular/router';
import { Eliminado } from '../../models/Eliminado';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {

  clientes: Cliente[] = [];
  eliminados: Eliminado[] = [];
  clienteSeleccionado: Cliente = new Cliente();
  modalAction ?: string;
  modalTitle ?: string;
  mostrarModal = false;

  constructor(private apiService: ServiceApiService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerClientesEliminados();
  }

  async obtenerClientes() {
    this.clientes = await this.apiService.obtenerClientes();
  }

  async obtenerClientesEliminados() {
    this.eliminados = await this.apiService.obtenerClientesEliminados();
  }

  cerrarSesion() {
    this.apiService.logout();
    this.router.navigate(['/login']);
  }

  abrirModalCrear() {
    this.clienteSeleccionado = new Cliente();
    this.modalAction = 'Crear';
    this.modalTitle = 'Crear Cliente';
    this.mostrarModal = true;
  }

  abrirModalEditar(cliente: Cliente) {
    this.clienteSeleccionado = { ...cliente }; // Crear una copia del cliente seleccionado
    this.modalAction = 'Editar';
    this.modalTitle = 'Editar Cliente';
    this.mostrarModal = true;
  }

  async guardarCliente() {
    if (this.modalAction === 'Crear') {
      const exito = await this.apiService.insertarCliente(this.clienteSeleccionado);
      if (exito) {
        this.mostrarModal = false; // Ocultar el modal
        this.obtenerClientes(); // Actualizar la lista de clientes
      } else {
        alert('Error al crear el cliente.');
      }
    } else if (this.modalAction === 'Editar') {
      const exito = await this.apiService.editarCliente(this.clienteSeleccionado.correo, this.clienteSeleccionado);
      if (exito) {
        this.mostrarModal = false; // Ocultar el modal
        this.obtenerClientes(); // Actualizar la lista de clientes
      } else {
        alert('Error al editar el cliente.');
      }
    }
  }

  async eliminarCliente(cliente: Cliente) {
    const confirmacion = confirm(`¿Estás seguro de eliminar a ${cliente.nombre} ${cliente.apellido}?`);
    if (confirmacion) {
      const exito = await this.apiService.eliminarCliente(cliente.correo);
      if (exito) {
        // Actualizar la lista de clientes después de eliminar
        this.obtenerClientes();
      } else {
        alert('No se pudo eliminar el cliente.');
      }
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/Cliente';
import { Eliminado } from '../models/Eliminado';
import { Usuario } from '../models/Usuario';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {

  private loggedIn = false;

  private apiUrl = 'https://localhost:7220/api';

  constructor(private http: HttpClient) { }

  logout(): void {
    this.loggedIn = false;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('loggedIn');
    }
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('loggedIn') === 'true';
    }
    return false;
  }

  // Login
  async login(usuario:Usuario) : Promise<boolean>{
    try{
      var response = (await axios.post(`${this.apiUrl}/autenticacion`, usuario)).data;
      if(response.codigo === 0){
        this.loggedIn = true;
        if (typeof window !== 'undefined') {
          localStorage.setItem('loggedIn', 'true');
        }
        return true;
      }
      else{return false}
    }
    catch{
      return false;
    }
  }
  
  // Insertar cliente
  async insertarCliente(cliente: Cliente): Promise<boolean> {
    try{
      var response = (await axios.post(`${this.apiUrl}/cliente`, cliente)).data;
      if(response.codigo === 0){
        return true;
      }
      else{return false}
    }
    catch{
      return false;
    }
  }

  // Obtener clientes
  async obtenerClientes() : Promise<Cliente[]>{
    const response = (await axios.get(`${this.apiUrl}/clientes`)).data;
    if (response.codigo === 0) {
      return response.detalle as Cliente[];
    } else {
      return [];
    }
  }

  // Obtener clientes eliminados
  async obtenerClientesEliminados(): Promise<Eliminado[]> {
    const response = (await axios.get(`${this.apiUrl}/clientes/eliminados`)).data;
    if (response.codigo === 0) {
      console.log("Eliminados: ", response.detalle);
      return response.detalle as Eliminado[];
    } else {
      return [];
    }
  }

  // Editar cliente por correo
  async editarCliente(correo: string, cliente: Cliente) : Promise<boolean> {
    try{
      var response = (await axios.put(`${this.apiUrl}/cliente/${correo}`, cliente)).data;
      console.log(response);
      if(response.codigo === 0){
        return true;
      }
      else{return false}
    }
    catch{
      return false;
    }
  }

  // Eliminar cliente por correo
  async eliminarCliente(correo:string) : Promise<boolean> {
    try{
      console.log("Entra a eliminar", correo);
      var response = (await axios.delete(`${this.apiUrl}/cliente/${correo}`)).data;
      if(response.codigo === 0){
        console.log(response);
        return true;
      }
      else{return false}
    }
    catch{
      return false;
    }
  }
}

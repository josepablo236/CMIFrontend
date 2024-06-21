import { Component } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { ServiceApiService } from '../../services/service-api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  usuarioObj: Usuario = new Usuario();
  mensajeError: string = '';
  usuario : string = "";
  password : string = "";

  
  constructor(private apiService: ServiceApiService, private router: Router) { }

  async login() {
    this.usuarioObj.usuario = this.usuario;
    this.usuarioObj.contraseña = this.password;
    console.log(this.usuarioObj);
    const success = await this.apiService.login(this.usuarioObj);
    if (success) {
      this.router.navigate(['/clientes']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}

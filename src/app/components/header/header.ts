import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  logado = !!localStorage.getItem('usuario');
  tipoUsuario = localStorage.getItem('tipoUsuario');
  mostrarBusca = location.pathname === '/explorar';
  busca = '';

  logout() {
    localStorage.clear();
    location.href = '/login';
  }
}

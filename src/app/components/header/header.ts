import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  logado = !!localStorage.getItem('token');
  tipoUsuario = localStorage.getItem('tipoUsuario');
  usuarioNome = localStorage.getItem('usuarioNome');
  avatarUrl = localStorage.getItem('avatarUrl');
  mostrarBusca = location.pathname === '/explorar';
  busca = '';

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}

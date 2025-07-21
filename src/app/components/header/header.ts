import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatExpansionModule
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  readonly panelOpenState = signal(false);
  logado = false;
  tipoUsuario: string | null = null;
  usuarioNome: string | null = null;
  avatarUrl: string | null = null;
  mostrarBusca = false;
  busca = '';

  ngOnInit() {
    this.atualizarEstado();
    window.addEventListener('storage', () => this.atualizarEstado()); // Detecta alterações no localStorage em outras abas
  }

  atualizarEstado() {
    this.logado = !!localStorage.getItem('token');
    this.tipoUsuario = localStorage.getItem('tipoUsuario');
    this.usuarioNome = localStorage.getItem('usuarioNome');
    this.avatarUrl = localStorage.getItem('avatarUrl');
    this.mostrarBusca = location.pathname === '/explorar';
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}

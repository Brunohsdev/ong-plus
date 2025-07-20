// perfil-page.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  id: string;
  tipo: 'doador' | 'ong';
  nome: string;
  email: string;
  telefone?: string;
  foto?: string; // URL
  bio?: string;
  localizacao?: string;
  causas?: string[]; // só para ONG
  doacoesRealizadas?: number; // só para Doador
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil {
  @Input() user!: User;

  getCausaIcon(causa: string): string {
    const icons: Record<string, string> = {
      'educacao': '📚',
      'saude': '🏥',
      'meio-ambiente': '🌱',
      'animais': '🐾',
      'social': '🤝',
      'cultura': '🎭',
      'direitos-humanos': '✊'
    };
    return icons[causa.toLowerCase()] || '❤️';
  }
}

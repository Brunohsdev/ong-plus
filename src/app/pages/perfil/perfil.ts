import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { User, OngUser } from '../../models/user.model';
import { Footer } from "../../components/footer/footer";
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,

   Header,
    Footer
],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil {
  @Input() user!: User | OngUser;
  @Input() isOwnProfile: boolean = false;

  // Type guard para OngUser
  isOng(user: User | OngUser): user is OngUser {
    return user.tipo === 'ong';
  }

  // Função para formatar CNPJ
  formatCNPJ(cnpj: string): string {
    if (!cnpj) return '';
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }

  // Função para formatar CEP
  formatCEP(cep: string): string {
    if (!cep) return '';
    return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }

  // Função para formatar data
  formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { User, OngUser } from '../../models/user.model';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    Header,
    Footer
  ],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil implements OnInit {
  user!: User | OngUser;
  isOwnProfile = false;

  // Mock data - REMOVER NA PRODUÇÃO
  mockUser: OngUser = {
    _id: '123',
    nome: 'ONG Protetora dos Animais',
    email: 'contato@protetora.org',
    tipo: 'ong',
    fotoPerfil: 'public/ong-exemplo.svg',
    telefone: '(11) 98765-4321',
    endereco: {
      rua: 'Rua dos Animais',
      numero: '100',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234567'
    },
    dataCriacao: new Date('2020-05-15'),
    cnpj: '12345678000190',
    descricao: 'ONG dedicada ao resgate e cuidado de animais abandonados.',
    areasAtuacao: ['Animais', 'Resgate', 'Adoção'],
    selos: [
      { tipo: 'Transparência', dataConquista: new Date('2021-08-20') }
    ],
    redesSociais: {
      facebook: 'https://facebook.com/protetora',
      instagram: 'https://instagram.com/protetora'
    }
  };

  constructor(private route: ActivatedRoute, private datePipe: DatePipe) {}

  ngOnInit(): void {
    // Mock - substituir por chamada real na integração
    this.user = this.mockUser;
    this.checkIfOwnProfile();
  }

  private checkIfOwnProfile(): void {
    // Mock - na implementação real, comparar com ID do usuário logado
    this.isOwnProfile = true;
  }

  isOng(user: User | OngUser): user is OngUser {
    return user.tipo === 'ong';
  }

  formatCNPJ(cnpj: string): string {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }

  formatCEP(cep: string): string {
    return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'MMM/yyyy') || '';
  }
}

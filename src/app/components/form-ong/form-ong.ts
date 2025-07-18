import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-ong',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective,  NgxMaskDirective,RouterLink],
  templateUrl: './form-ong.html',
  styleUrls: ['./form-ong.css']
})
export class FormOng {
  ong = {
    nome: '',
    cnpj: '',
    email: '',
    senha: '',
    telefone: '',
    areaAtuacao: '',
    endereco: '',
    site: '',
    descricao: '',
    aceitouTermos: false
  };

  areasAtuacao = [
    'Animais',
    'Crianças',
    'Educação',
    'Meio Ambiente',
    'Saúde',
    'Direitos Humanos'
  ];

  cadastrarOng() {
    console.log('ONG cadastrada:', this.ong);
    // Implementar lógica de cadastro
  }
}

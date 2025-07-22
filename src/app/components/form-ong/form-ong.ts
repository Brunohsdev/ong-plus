import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-form-ong',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective, RouterLink],
  templateUrl: './form-ong.html',
  styleUrls: ['./form-ong.css']
})
export class FormOng {
  constructor(private router: Router) {}

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

  cnpjValido = true;
  senhaValida = true;

  areasAtuacao = [
    'Animais',
    'Crianças',
    'Educação',
    'Meio Ambiente',
    'Saúde',
    'Direitos Humanos'
  ];

  cadastrarOng() {
    this.cnpjValido = this.validarCNPJ(this.ong.cnpj);
    this.senhaValida = this.validarSenha(this.ong.senha);

    if (!this.cnpjValido || !this.senhaValida) return;

    console.log('ONG cadastrada:', this.ong);
    this.router.navigate(['/dashboard-ong']);
  }

  validarCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0, pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += +numeros[tamanho - i] * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== +digitos[0]) return false;

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += +numeros[tamanho - i] * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === +digitos[1];
  }

  validarSenha(senha: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(senha);
  }
}

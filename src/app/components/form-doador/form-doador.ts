import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-form-doador',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective, RouterLink],
  templateUrl: './form-doador.html',
  styleUrls: ['./form-doador.css']
})
export class FormDoador {
  constructor(private router: Router) {}

  doador = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    telefone: '',
    nascimento: '',
    genero: '',
    interesses: [] as string[],
    receberNewsletter: false,
    aceitouTermos: false
  };

  cpfValido = true;
  idadeValida = true;
  senhaValida = true;

  generos = ['Masculino', 'Feminino', 'Não-binário', 'Outro', 'Prefiro não informar'];
  areasInteresse = ['Educação', 'Meio Ambiente', 'Saúde', 'Animais', 'Cultura', 'Assistência Social'];

  toggleInteresse(interesse: string) {
    const idx = this.doador.interesses.indexOf(interesse);
    if (idx >= 0) this.doador.interesses.splice(idx, 1);
    else this.doador.interesses.push(interesse);
  }

  cadastrarDoador() {
    this.cpfValido = this.validarCPF(this.doador.cpf);
    this.idadeValida = this.validarIdade(this.doador.nascimento);
    this.senhaValida = this.validarSenha(this.doador.senha);

    if (!this.cpfValido || !this.idadeValida || !this.senhaValida) return;

    console.log('Doador cadastrado:', this.doador);
    this.router.navigate(['/dashboard-doador']);
  }

  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += +cpf[i-1] * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== +cpf[9]) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += +cpf[i-1] * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === +cpf[10];
  }

  validarIdade(data: string): boolean {
    const nasc = new Date(data);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const mes = hoje.getMonth() - nasc.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) idade--;
    return idade >= 18;
  }

  validarSenha(senha: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(senha);
  }
}

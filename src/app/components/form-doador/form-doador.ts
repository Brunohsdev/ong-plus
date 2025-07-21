import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

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

  generos = ['Masculino', 'Feminino', 'Não-binário', 'Outro', 'Prefiro não informar'];
  areasInteresse = ['Educação', 'Meio Ambiente', 'Saúde', 'Animais', 'Cultura', 'Assistência Social'];

  toggleInteresse(interesse: string) {
    if (this.doador.interesses.includes(interesse)) {
      this.doador.interesses = this.doador.interesses.filter(i => i !== interesse);
    } else {
      this.doador.interesses.push(interesse);
    }
  }

  cadastrarDoador() {
    console.log('Doador cadastrado:', this.doador);
    // Implementar lógica de cadastro
      this.router.navigate(['/dashboard-doador']);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-form-doador',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './form-doador.html',
  styleUrls: ['./form-doador.css']
})
export class FormDoador {
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
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { FormOng } from '../../components/form-ong/form-ong';
import { FormDoador } from '../../components/form-doador/form-doador';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-cadastro',
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule, 
    FormOng, 
    FormDoador,
  Footer],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class Cadastro {
  abaSelecionada: 'ong' | 'doador' = 'ong';

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

  doador = {
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    telefone: '',
    nascimento: '',
    genero: '',
    interesses: [] as string[],
    receberNewsletter: false,
    aceitouTermos: false
  };

  cadastrarOng() {
    if (this.ong.nome && this.ong.cnpj && this.ong.email && this.ong.senha && this.ong.areaAtuacao && this.ong.aceitouTermos) {
      console.log('ONG cadastrada:', this.ong);
      // Aqui você faria a chamada para o serviço de cadastro
      alert('ONG cadastrada com sucesso!');
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  cadastrarDoador() {
    if (this.doador.nome && this.doador.email && this.doador.senha && this.doador.cpf && this.doador.nascimento && this.doador.genero && this.doador.aceitouTermos) {
      console.log('Doador cadastrado:', this.doador);
      // Aqui você faria a chamada para o serviço de cadastro
      alert('Doador cadastrado com sucesso!');
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
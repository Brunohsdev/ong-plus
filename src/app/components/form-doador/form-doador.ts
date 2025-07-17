
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-form-doador',
  imports: [CommonModule, FormsModule, ],
  template: `
    <form (ngSubmit)="cadastrarDoador()">
      <div class="mb-3">
        <label>Nome completo</label>
        <input class="form-control" [(ngModel)]="doador.nome" name="nome" required />
      </div>
      <div class="mb-3">
        <label>CPF</label>
        <input class="form-control" mask="000.000.000-00" [(ngModel)]="doador.cpf" name="cpf" required />
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input type="email" class="form-control" [(ngModel)]="doador.email" name="email" required />
      </div>
      <div class="mb-3">
        <label>Senha</label>
        <input type="password" class="form-control" [(ngModel)]="doador.senha" name="senha" required />
      </div>
      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" [(ngModel)]="doador.aceitouTermos" name="termos" />
        <label class="form-check-label">Aceito os termos</label>
      </div>
      <button class="btn btn-success w-100" type="submit">Cadastrar Doador</button>
    </form>
  `
})
export class FormDoador {
  doador = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    aceitouTermos: false
  };

  cadastrarDoador() {
    alert('Doador cadastrado: ' + this.doador.nome);
  }
}

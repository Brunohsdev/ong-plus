import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-form-ong',
  imports: [CommonModule, FormsModule, ],
  template: `
    <form (ngSubmit)="cadastrarOng()">
      <div class="mb-3">
        <label>Nome da ONG</label>
        <input class="form-control" [(ngModel)]="ong.nome" name="nome" required />
      </div>
      <div class="mb-3">
        <label>CNPJ</label>
        <input class="form-control" mask="00.000.000/0000-00" [(ngModel)]="ong.cnpj" name="cnpj" required />
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input type="email" class="form-control" [(ngModel)]="ong.email" name="email" required />
      </div>
      <div class="mb-3">
        <label>Senha</label>
        <input type="password" class="form-control" [(ngModel)]="ong.senha" name="senha" required />
      </div>
      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" [(ngModel)]="ong.aceitouTermos" name="termos" />
        <label class="form-check-label">Aceito os termos</label>
      </div>
      <button class="btn btn-success w-100" type="submit">Cadastrar ONG</button>
    </form>
  `
})
export class FormOng {
  ong = {
    nome: '',
    cnpj: '',
    email: '',
    senha: '',
    aceitouTermos: false
  };

  cadastrarOng() {
    alert('ONG cadastrada: ' + this.ong.nome);
  }
}
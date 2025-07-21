import {ChangeDetectionStrategy, Component,signal } from '@angular/core';
import {CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../../models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
   changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrls: ['./login.css']

})
export class Login {
  hidePassword = true;
  email:string = '';
  senha:string = '';
  erro:string = '';

  constructor(private http: HttpClient, private router: Router) {}
hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  login() {
    this.erro = '';
    const body = { email: this.email, senha: this.senha };

    this.http.post<{ token: string, user: User }>('http://localhost:3000/login', body)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('tipoUsuario', res.user.tipo);
          localStorage.setItem('userId', res.user._id);
          localStorage.setItem('nomeUsuario', res.user.nome);

          if (res.user.tipo === 'ong') {
            this.router.navigate(['/dashboard-ong']);
          } else if (res.user.tipo === 'doador') {
            this.router.navigate(['/dashboard-doador']);
          } else {
            this.erro = 'Tipo de usuário inválido.';
          }
        },
        error: (err) => {
          this.erro = 'Login falhou. Verifique o e-mail e a senha.';
          console.error(err);
        }
      });
  }
}

import {ChangeDetectionStrategy, Component,signal } from '@angular/core';
import {CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule
  ],
   changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrls: ['./login.css']

})
export class Login {
  email = '';
  senha = '';
  erro = '';
  mostrarSenha = false;
  login(){}
  hidePassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  fazerLogin(): void {
    this.authService.login({ email: this.email, senha: this.senha }).subscribe({
      next: () => {
        const user = this.authService.getUser();
        if (user?.tipo === 'doador') {
          this.router.navigate(['/dashboard-doador']);
        } else if (user?.tipo === 'ong') {
          this.router.navigate(['/dashboard-ong']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.erro = 'E-mail ou senha inválidos!';
        console.error(err);
      },
    });
  }
}

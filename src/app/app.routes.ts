
import { Routes } from '@angular/router';

// Páginas
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { QuemSomos } from './pages/quem-somos/quem-somos';
import { Cadastro } from './pages/cadastro/cadastro';
import { FormDoador } from './components/form-doador/form-doador';
import { FormOng } from './components/form-ong/form-ong';
import { Explorar } from './pages/explorar/explorar';
import { Termos } from './pages/termos-de-uso/termos-de-uso';
import { DashboardOng } from './pages/dashboard-ong/dashboard-ong';
import { DashboardDoador } from './pages/dashboard-doador/dashboard-doador';
import { Campanhas } from './pages/campanhas/campanhas';

// Guards
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role.guard-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'quem-somos', component: QuemSomos },
  { path: 'cadastrar', component: Cadastro },
  { path: 'cadastrar-doador', component: FormDoador },
  { path: 'cadastrar-ong', component: FormOng },
  { path: 'explorar', component: Explorar },
  { path: 'termos-de-uso', component: Termos },
  { path: 'campanhas', component: Campanhas },

  // Dashboards com proteção de rota
  {
    path: 'dashboard-ong',
    component: DashboardOng,
    canActivate: [authGuard, roleGuard],
    data: { role: 'ong' }
  },
  {
    path: 'dashboard-doador',
    component: DashboardDoador,
    canActivate: [authGuard, roleGuard],
    data: { role: 'doador' }
  },

  // Rota coringa
  { path: '**', redirectTo: 'home' }
];

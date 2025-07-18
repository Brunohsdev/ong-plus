import { Routes } from '@angular/router';
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

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: Home},
    {path: 'login', component: Login},
    {path: 'quem-somos', component: QuemSomos},
    {path: 'cadastrar', component: Cadastro},
    {path: 'cadastrar-doador', component: FormDoador},
    {path: 'cadastrar-ong', component: FormOng},
    { path: 'explorar', component: Explorar},
    {path: 'form-doador', component: FormDoador},
    {path: 'form-ong', component: FormOng},
    {path: 'termos-de-uso', component: Termos},
    {path: 'dashboard-ong', component: DashboardOng},
    {path: 'dashboard-doador', component: DashboardDoador}

];

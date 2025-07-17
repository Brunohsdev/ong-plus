import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { QuemSomos } from './pages/quem-somos/quem-somos';
import { Cadastro } from './pages/cadastro/cadastro';
import { FormDoador } from './components/form-doador/form-doador';
import { FormOng } from './components/form-ong/form-ong';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: Home},
    {path: 'login', component: Login},
    {path: 'quem-somos', component: QuemSomos},
    {path: 'cadastrar', component: Cadastro},
    {path: 'cadastrar-doador', component: FormDoador},
    {path: 'cadastrar-ong', component: FormOng}

];

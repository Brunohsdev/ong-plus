import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [Header, Footer, RouterModule, ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}

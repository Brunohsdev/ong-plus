import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe, NgClass } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [Header, Footer, RouterModule, NgClass,CurrencyPipe, CommonModule ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
featuredCampaigns = [
    {
      id: 1,
      title: 'Doe Sangue, Salve Vidas',
      description: 'Participe da campanha de doação de sangue e ajude hospitais a manter seus estoques.',
      image: 'sangue.jpg',
      category: 'Saúde',
      goal: 10000,
      raised: 6500,
      badgeColor: 'danger'
    },
    {
      id: 2,
      title: 'Ajude com Alimentos',
      description: 'Doe cestas básicas para famílias em situação de vulnerabilidade alimentar.',
      image: 'doacao-de-alimentos.jpg',
      category: 'Assistência',
      goal: 20000,
      raised: 12500,
      badgeColor: 'success'
    },
    {
      id: 3,
      title: 'Acolhimento Animal',
      description: 'Ajude abrigos a cuidar de animais abandonados com doações de ração e medicamentos.',
      image: 'rescue-pets.jpg',
      category: 'Animais',
      goal: 8000,
      raised: 3200,
      badgeColor: 'warning'
    }
  ];

  howItWorksSteps = [
    {
      title: 'Explore',
      description: 'Encontre campanhas e ONGs com causas que combinam com seus valores e interesses.',
      icon: 'bi-search',
      color: 'primary'
    },
    {
      title: 'Contribua',
      description: 'Doe recursos, tempo ou habilidades de forma segura e transparente.',
      icon: 'bi-heart',
      color: 'danger'
    },
    {
      title: 'Acompanhe',
      description: 'Receba atualizações sobre o impacto real da sua contribuição.',
      icon: 'bi-graph-up',
      color: 'success'
    }
  ];

  testimonials = [
    {
      text: 'A ONG+ me conectou com um projeto animal incrível! Hoje sou voluntária com orgulho e vejo a diferença que fazemos.',
      author: 'Juliana Santos',
      role: 'Voluntária',
      avatar: 'juliana.jpg'
    },
    {
      text: 'Conseguimos mais de 200 doações graças à visibilidade que a plataforma nos proporcionou. Essencial para ONGs pequenas!',
      author: 'Instituto Mãos que Ajudam',
      role: 'ONG Parceira',
      avatar: 'maoshelp.jpg'
    },
    {
      text: 'Plataforma simples, segura e com causas que realmente importam. Consigo doar com apenas alguns cliques.',
      author: 'Carlos Mendes',
      role: 'Doador',
      avatar: 'carlos.jpg'
    }
  ];
}

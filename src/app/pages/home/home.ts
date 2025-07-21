import { Component, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe, NgClass } from '@angular/common';
import { CampaignService } from '../../services/campanha';
import { ModelCampanha } from '../../models/campanha.models';

@Component({
  selector: 'app-home',
  imports: [Header, Footer, RouterModule, NgClass, CurrencyPipe, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  featuredCampaigns: ModelCampanha[] = [];

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.campaignService.getCampaigns().subscribe({

      next: (data) => { 
        console.log("campanhas recebidas", data)
        this.featuredCampaigns = data;},
        error: (err) => console.error('Erro ao buscar campanhas:', err)
      });
  }

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
  getBadgeColor(categoria: string): string {
    switch (categoria.toLowerCase()) {
      case 'educação': return 'primary';
      case 'meio ambiente': return 'success';
      case 'saúde': return 'danger';
      default: return 'secondary';
    }
  }
}

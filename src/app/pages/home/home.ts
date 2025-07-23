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
   groupedCampaigns: ModelCampanha[][] = [];

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.campaignService.getCampaigns().subscribe({

      next: (data) => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        console.log("campanhas recebidas", data)
        this.featuredCampaigns = shuffled.slice(0, 3);
       this.groupedCampaigns = this.groupArray(this.featuredCampaigns, 3);
      },
        error: (err) => console.error('Erro ao buscar campanhas:', err)
      });
  }
  groupArray(arr: any[], size: number) {
    const newArr = [];
    for (let i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
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
    // Primeiro converte para minúsculas para comparação
    const categoriaLower = categoria.toLowerCase();
    
    switch (categoriaLower) {
      case 'saúde':        // #4E9F3D → Verde (success)
        return 'success';
      
      case 'educação':     // #1E5128 → Verde escuro (não tem exato, usar success)
        return 'success';
      
      case 'meio ambiente': // #3E7C17 → Verde (success)
        return 'success';
      
      case 'tecnologia':    // #191A19 → Quase preto (dark)
        return 'dark';
      
      case 'animais':       // #D8E9A8 → Verde claro (não tem exato, usar success com opacidade)
        return 'success';    // Ou criar uma classe customizada
      
      case 'alimentos':     // #FF9A76 → Laranja (warning)
        return 'warning';
      
      case 'roupas':        // #6A8CAF → Azul (info)
        return 'info';
      
      case 'dinheiro':      // #A7D7C5 → Verde água (não tem exato, info)
        return 'info';
      
      case 'sangue':        // #F47C7C → Vermelho (danger)
        return 'danger';
      
      case 'brinquedos':    // #86C166 → Verde (success)
        return 'success';
      
      case 'outros':        // #C4A7CB → Lilás (não tem exato, secondary)
        return 'secondary';
      
      default:
        return 'secondary';
    }
  }
}

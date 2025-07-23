import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { CampaignService } from '../../services/campanha';
import { ModelCampanha } from '../../models/campanha.models';
import { CampanhasCards } from '../../components/cards/cards';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule, 
    Header, 
    Footer,
    CampanhasCards, 
    RouterLink
  ],
  templateUrl: './explorar.html',
  styleUrls: ['./explorar.css']
})
export class Explorar {
  // Controle de UI
  showFilters = false;
  
  // Filtros
  searchTerm: string = '';
  selectedTag: string = '';
  selectedCategories: string[] = [];
  selectedLocation: string = '';
  sortOption: 'recent' | 'popular' | 'urgent' = 'recent';
  
  // Dados
  featuredCampaigns: ModelCampanha[] = [];
  
  // Opções de filtro
  popularTags = ['saúde', 'educação', 'meio ambiente', 'tecnologia', 'animais', 'outros'];
  
  categories = [
    'saúde', 
    'educação', 
    'meio ambiente', 
    'tecnologia', 
    'animais',
    'alimentos',
    'roupas',
    'dinheiro',
    'sangue',
    'brinquedos',
    'outros'
  ];
  
  locations = [
    'São Paulo',
    'Rio de Janeiro',
    'Belo Horizonte',
    'Brasília',
    'Bahia',
    'Porto Alegre',
    'Todas regiões'
  ];

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.loadCampaigns();
  }

  /**
   * Carrega as campanhas do serviço
   */
  loadCampaigns(): void {
    this.campaignService.getCampaigns().subscribe({
      next: (data) => {
        this.featuredCampaigns = data;
        console.log("Campanhas carregadas:", data);
      },
      error: (err) => {
        console.error('Erro ao buscar campanhas:', err);
        // Aqui você pode adicionar tratamento de erro mais sofisticado
      }
    });
  }

  /**
   * Filtra as campanhas com base nos critérios selecionados
   */
  get filteredCauses(): ModelCampanha[] {
    let results = [...this.featuredCampaigns];

    // Filtro por termo de busca
    if (this.searchTerm.trim()) {
      const keyword = this.searchTerm.trim().toLowerCase();
      results = results.filter(c =>
        c.titulo.toLowerCase().includes(keyword) ||
        c.descricao.toLowerCase().includes(keyword) ||
        (c.ong?.nome?.toLowerCase().includes(keyword) ?? false)
      );
    }

    // Filtro por tag selecionada
    if (this.selectedTag) {
      results = results.filter(c => c.categoria === this.selectedTag);
    }

    // Filtro por categorias selecionadas
    if (this.selectedCategories.length > 0) {
      results = results.filter(c => this.selectedCategories.includes(c.categoria));
    }

    // Filtro por localização
    if (this.selectedLocation && this.selectedLocation !== 'Todas regiões') {
      results = results.filter(c => 
        c.local?.cidade === this.selectedLocation ||
        c.local?.estado === this.selectedLocation
      );
    }

    // Ordenação
    return this.sortCampaigns(results);
  }

  /**
   * Aplica a ordenação às campanhas
   */
  private sortCampaigns(campaigns: ModelCampanha[]): ModelCampanha[] {
    switch (this.sortOption) {
      case 'popular':
        return campaigns.sort((a, b) => (b.avaliacaoCount || 0) - (a.avaliacaoCount || 0));
      case 'urgent':
        return campaigns.sort((a, b) => {
          const dateA = a.dataFim ? new Date(a.dataFim).getTime() : 0;
          const dateB = b.dataFim ? new Date(b.dataFim).getTime() : 0;
          return dateA - dateB;
        });
      case 'recent':
      default:
        return campaigns.sort((a, b) => {
          const dateA = a.dataInicio ? new Date(a.dataInicio).getTime() : 0;
          const dateB = b.dataInicio ? new Date(b.dataInicio).getTime() : 0;
          return dateB - dateA;
        });
    }
  }

  /**
   * Alterna a exibição dos filtros
   */
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  /**
   * Seleciona/deseleciona uma tag
   */
  selectTag(tag: string): void {
    this.selectedTag = this.selectedTag === tag ? '' : tag;
  }

  /**
   * Alterna uma categoria nos filtros
   */
  toggleCategory(category: string): void {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else {
      this.selectedCategories.push(category);
    }
  }

  /**
   * Reseta todos os filtros
   */
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedTag = '';
    this.selectedCategories = [];
    this.selectedLocation = '';
    this.sortOption = 'recent';
  }

  /**
   * Retorna a cor associada a uma categoria
   */
  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      'saúde': '#4E9F3D',
      'educação': '#1E5128',
      'meio ambiente': '#3E7C17',
      'tecnologia': '#191A19',
      'animais': '#D8E9A8',
      'alimentos': '#FF9A76',
      'roupas': '#6A8CAF',
      'dinheiro': '#A7D7C5',
      'sangue': '#F47C7C',
      'brinquedos': '#86C166',
      'outros': '#C4A7CB'
    };
    return colors[category] || '#B08D57';
  }

  /**
   * Manipula o evento de doação
   */
  handleDonate(campaign: ModelCampanha): void {
    console.log("Doar para campanha:", campaign);
    // Implemente a lógica de doação aqui
    // Pode ser redirecionamento ou abertura de modal
  }
}
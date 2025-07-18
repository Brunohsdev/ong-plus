import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Header, Footer],
  templateUrl: './explorar.html',
  styleUrls: ['./explorar.css']
})
export class Explorar {
  showFilters = false;
  selectedTag = '';
  sortOption = 'recent';
  selectedLocation = '';

  popularTags = ['Animais', 'Educação', 'Meio Ambiente', 'Saúde', 'Alimentos', 'Idosos'];

  categories = [
    'Animais',
    'Crianças',
    'Educação',
    'Meio Ambiente',
    'Saúde',
    'Direitos Humanos'
  ];
  selectedCategories: string[] = [];

  locations = [
    'São Paulo',
    'Rio de Janeiro',
    'Belo Horizonte',
    'Brasília',
    'Porto Alegre',
    'Todas regiões'
  ];

  causes = [
    {
      id: 1,
      title: 'Abrigo para Animais de Rua',
      description: 'Ajude a construir um abrigo para animais abandonados na região metropolitana...',
      category: 'Animais',
      image: 'rescue-pets.jpg',
      goal: 50000,
      raised: 32500,
      location: 'São Paulo',
      donors: 142,
      urgent: true
    },
    
  ];

  get filteredCauses() {
    let results = [...this.causes];

    // Filtros
    if (this.selectedTag) {
      results = results.filter(c => c.category === this.selectedTag);
    }

    if (this.selectedCategories.length > 0) {
      results = results.filter(c => this.selectedCategories.includes(c.category));
    }

    if (this.selectedLocation) {
      results = results.filter(c => c.location === this.selectedLocation);
    }

    // Ordenação
    switch (this.sortOption) {
      case 'popular':
        return results.sort((a, b) => b.donors - a.donors);
      case 'urgent':
        return results.sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
      default:
        return results;
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  selectTag(tag: string) {
    this.selectedTag = this.selectedTag === tag ? '' : tag;
  }

  toggleCategory(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else {
      this.selectedCategories.push(category);
    }
  }

  getCategoryColor(category: string) {
    const colors: Record<string, string> = {
      'Animais': '#FF9A76',
      'Crianças': '#6A8CAF',
      'Educação': '#A7D7C5',
      'Meio Ambiente': '#86C166',
      'Saúde': '#F47C7C',
      'Direitos Humanos': '#C4A7CB'
    };
    return colors[category] || '#B08D57';
  }

  viewCause(id: number) {
    // Navegar para detalhes da causa
    console.log('Visualizar causa:', id);
  }
}

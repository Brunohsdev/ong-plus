// cards.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModelCampanha } from '../../models/campanha.models';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Doacao } from '../../pages/doacao/doacao';

@Component({
  selector: 'app-campaign-card',
  standalone: true,
  imports: [CommonModule, RouterModule, Doacao, RouterLink],
  templateUrl: './cards.html',
  styleUrls: ['./cards.css']
})
export class CampanhasCards {
  @Input({ required: true }) campaign!: ModelCampanha;
  @Output() donate = new EventEmitter<ModelCampanha>();
  selectedCampaign: ModelCampanha | null = null;

  getProgressPercentage(): number {
    return this.campaign.meta > 0 
      ? (this.campaign.arrecadado / this.campaign.meta) * 100
      : 0;
  }

  onDonate(): void {
    this.donate.emit(this.campaign);
  }

  truncate(text: string, maxLength: number): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  getImageUrl(): string {
    const imagem = this.campaign.imagem;
    if (Array.isArray(imagem) && imagem.length > 0) {
      return imagem[0];
    } else if (typeof imagem === 'string') {
      return imagem;
    }
    return 'assets/images/default-campaign.jpg'; // fallback
  }

  openModal(): void {
    this.selectedCampaign = this.campaign;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  }

  closeModal(event: Event): void {
    event.stopPropagation();
    this.selectedCampaign = null;
    document.body.style.overflow = '';
  }
}
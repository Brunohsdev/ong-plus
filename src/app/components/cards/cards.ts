import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModelCampanha } from '../../models/campanha.models';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-campaign-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressBarModule, RouterModule],
  templateUrl: './cards.html',
  styleUrls: ['./cards.css']
})
export class CampanhasCards {
  @Input({ required: true }) campaign!: ModelCampanha;
  @Output() donate = new EventEmitter<ModelCampanha>();

  getProgressPercentage(): number {
    return (this.campaign.arrecadado / this.campaign.meta) * 100;
  }

  onDonate(): void {
    this.donate.emit(this.campaign);
  }
  truncate(text: string, maxLength: number): string {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

}

// campaigns.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


import { MatTableDataSource } from '@angular/material/table';
// import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { CampaignService } from '../../services/campanha';
import { ModelCampanha } from '../../models/campanha.models';
import { NewCampaignDialogComponent } from '../../components/new-campaign-dialog/new-campaign-dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-campaigns',
  standalone: true,
    imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // Angular Material
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatIcon
  ],
  templateUrl: './campanhas.html',
  styleUrls: ['./campanhas.css']
})
export class Campanhas implements OnInit {
  displayedColumns: string[] = ['image', 'title', 'category', 'goal', 'progress', 'status', 'actions'];
  dataSource = new MatTableDataSource<ModelCampanha>();
  loading = true;

  constructor(
    private campaignService: CampaignService,
    private dialog: MatDialog
  ) {}

  categories: string[] = ['Educação', 'Saúde', 'Animais']; // Exemplo

applyFilter(event: any) {
  const value = (event.target as HTMLInputElement).value;
  // sua lógica de filtro aqui
}

filterByCategory(value: string) {
  // lógica de filtro por categoria
}

filterByStatus(value: string) {
  // lógica de filtro por status
}
  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.loading = true;
    this.campaignService.getCampaigns().subscribe({
      next: (campaigns) => {
        this.dataSource.data = campaigns;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  openNewCampaignDialog(): void {
    const dialogRef = this.dialog.open(NewCampaignDialogComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCampaigns();
      }
    });
  }

  editCampaign(campaign: ModelCampanha): void {
    const dialogRef = this.dialog.open(NewCampaignDialogComponent, {
      width: '800px',
      disableClose: true,
      data: { campaign }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCampaigns();
      }
    });
  }

  deleteCampaign(campaign: ModelCampanha): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir a campanha "${campaign.titulo}"?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.campaignService.deleteCampaign(campaign._id).subscribe({
          next: () => {
            this.loadCampaigns();
          }
        });
      }
    });
  }

  getProgress(campaign: ModelCampanha): number {
    return (campaign.meta / campaign.arrecadado) * 100;
  }
}

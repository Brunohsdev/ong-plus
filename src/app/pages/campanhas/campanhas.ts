// campaigns.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// import { NewCampaignDialogComponent } from './new-campaign-dialog/new-campaign-dialog.component';

import { MatTableDataSource } from '@angular/material/table';
// import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { CampaignService } from '../../services/campanha';
import { ModelCampanha } from '../../models/campanha.models';

@Component({
  selector: 'app-campaigns',
  imports: [],
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
        message: `Tem certeza que deseja excluir a campanha "${campaign.title}"?`,
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
    return (campaign.raised / campaign.goal) * 100;
  }
}

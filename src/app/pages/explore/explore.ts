// explore.component.ts
import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campanha';
import { ModelCampanha } from '../../models/campanha.models';
// import { DonationDialogComponent } from './donation-dialog/donation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.html',
  styleUrls: ['./explore.css']
})
export class Explore implements OnInit {
  campaigns: ModelCampanha[] = [];
  featuredCampaigns: ModelCampanha[] = [];
  categories = ['alimentos', 'roupas', 'dinheiro', 'sangue', 'brinquedos', 'outros'];
  selectedCategory = '';
  loading = true;

  constructor(
    private campaignService: CampaignService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.loadCampaigns();
    this.loadFeaturedCampaigns();
  }

  // loadCampaigns(): void {
  //   this.loading = true;
  //   this.campaignService.getCampaignById(this.selectedCategory).subscribe({
  //     next: (campaigns) => {
  //       this.campaigns = campaigns;
  //       this.loading = false;
  //     },
  //     error: () => {
  //       this.loading = false;
  //     }
  //   });
  // }

  loadFeaturedCampaigns(): void {
    this.campaignService.getFeaturedCampaigns().subscribe({
      next: (campaigns) => {
        this.featuredCampaigns = campaigns;
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    // this.loadCampaigns();
  }

  // openDonationDialog(campaign: ModelCampanha): void {
  //   const dialogRef = this.dialog.open(DonationDialogComponent, {
  //     width: '600px',
  //     data: { campaign }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // Atualizar lista de campanhas após doação
  //       this.loadCampaigns();
  //     }
  //   });
  // }

  getProgress(campaign: ModelCampanha): number {
    return (campaign.meta / campaign.arrecadado) * 100;
  }
}

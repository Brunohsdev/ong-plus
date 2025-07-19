// explore.component.ts
import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../core/services/campaign.service';
import { Campaign } from '../../core/models/campaign.model';
import { DonationDialogComponent } from './donation-dialog/donation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  campaigns: Campaign[] = [];
  featuredCampaigns: Campaign[] = [];
  categories = ['alimentos', 'roupas', 'dinheiro', 'sangue', 'brinquedos', 'outros'];
  selectedCategory = '';
  loading = true;

  constructor(
    private campaignService: CampaignService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCampaigns();
    this.loadFeaturedCampaigns();
  }

  loadCampaigns(): void {
    this.loading = true;
    this.campaignService.getPublicCampaigns(this.selectedCategory).subscribe({
      next: (campaigns) => {
        this.campaigns = campaigns;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadFeaturedCampaigns(): void {
    this.campaignService.getFeaturedCampaigns().subscribe({
      next: (campaigns) => {
        this.featuredCampaigns = campaigns;
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.loadCampaigns();
  }

  openDonationDialog(campaign: Campaign): void {
    const dialogRef = this.dialog.open(DonationDialogComponent, {
      width: '600px',
      data: { campaign }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Atualizar lista de campanhas após doação
        this.loadCampaigns();
      }
    });
  }

  getProgress(campaign: Campaign): number {
    return (campaign.raised / campaign.goal) * 100;
  }
}

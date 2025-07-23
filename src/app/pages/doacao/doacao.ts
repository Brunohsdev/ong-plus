import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonationService } from '../../services/donation-service';
import { Donation } from '../../models/donation.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './doacao.html',
  styleUrls: ['./doacao.css']
})
export class Doacao {
  @Input() campaignId: string = '';
  @Input() campaignTitle: string = '';
  @Input() campaignImage: string = '';
  @Output() donationComplete = new EventEmitter<Donation>();
  @Output() closeModal = new EventEmitter<void>();

  donation: Partial<Donation> = {
    valor: 50,
    mensagem: '',
    anonima: false
  };

  donationAmounts = [30, 50, 100, 200, 500];
  customAmount: number | null = null;
  paymentMethods = ['credit_card', 'pix', 'bank_slip'];
  selectedPaymentMethod: string = 'credit_card';
  currentStep: number = 1;
  isLoading: boolean = false;
  donationSuccess: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private donationService: DonationService,
    private router: Router
  ) {}

  selectAmount(amount: number): void {
    this.donation.valor = amount;
    this.customAmount = null;
  }

  setCustomAmount(): void {
    if (this.customAmount && this.customAmount > 0) {
      this.donation.valor = this.customAmount;
    }
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    } else {
      this.submitDonation();
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.errorMessage = null;
    }
  }

  submitDonation(): void {
    if (!this.donation.valor || this.donation.valor <= 0) {
      this.errorMessage = 'Por favor, insira um valor válido';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const completeDonation: Donation = {
      ...this.donation as Donation,
      campanha: {
        _id: this.campaignId,
        titulo: this.campaignTitle,
        imagem: this.campaignImage
      },
      dataDoacao: new Date()
    };

    this.donationService.createDonation(completeDonation).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.donationSuccess = true;
        this.donationComplete.emit(response);
      },
      error: (err) => {
        console.error('Erro ao realizar doação:', err);
        this.errorMessage = 'Ocorreu um erro ao processar sua doação. Por favor, tente novamente.';
        this.isLoading = false;
      }
    });
  }

  finishDonation(): void {
    this.closeModal.emit();
    this.router.navigate(['/campaigns', this.campaignId]);
  }

  handleClose(): void {
    this.closeModal.emit();
  }
}
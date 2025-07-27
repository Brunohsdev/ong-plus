import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { ModelCampanha } from '../../models/campanha.models';
import { CampaignService } from '../../services/campanha';


@Component({
  selector: 'app-new-campaign-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './new-campaign-dialog.html',
  styleUrls: ['./new-campaign-dialog.css']
})
export class NewCampaignDialog {
  campaignForm: FormGroup;
  categories = ['saúde', 'educação', 'meio ambiente', 'tecnologia', 'animais',
    'alimentos', 'roupas', 'dinheiro', 'sangue', 'brinquedos', 'outros'];
  minDate = new Date();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewCampaignDialog>,
    private campaignService: CampaignService,
    @Inject(MAT_DIALOG_DATA) public data: { campaign?: ModelCampanha }
  ) {
    this.campaignForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descricao: ['', [Validators.required, Validators.maxLength(500)]],
      categoria: ['', Validators.required],
      meta: ['', [Validators.required, Validators.min(1)]],
      dataFim: ['', Validators.required],
      local: this.fb.group({
        endereco: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required]
      }),
      fotos: ['']
    });

    if (data?.campaign) {
      this.campaignForm.patchValue(data.campaign);
    }
  }

  getCategoryName(category: string): string {
    const categoryNames: Record<string, string> = {
      'saúde': 'saúde',
      'educação': 'educação',
      'meio ambiente': 'meio ambiente',
      'tecnologia': 'tecnologia',
      'animais': 'animais',
      'alimentos': 'alimentos',
      'roupas': 'roupas',
      'dinheiro': 'dinheiro',
      'sangue': 'sangue',
      'brinquedos': 'brinquedos',
      'outros': 'outros'
    };
    return categoryNames[category] || category;
  }

  private markAllFieldsTouched(group: FormGroup): void {
    Object.keys(group.controls).forEach(field => {
      const control = group.get(field);
      if (control instanceof FormGroup) {
        this.markAllFieldsTouched(control); // Recursivo para nested groups
      } else {
        control?.markAsTouched();
      }
    });
  }

  onSubmit(): void {
    if (this.campaignForm.invalid) {
      this.markAllFieldsTouched(this.campaignForm); // 👈 Força exibir os erros
      return;
    }

    const formData = new FormData();

    Object.keys(this.campaignForm.value).forEach(key => {
      if (key === 'local') {
        formData.append(key, JSON.stringify(this.campaignForm.value[key]));
      } else if (key === 'fotos' && this.campaignForm.value[key]) {
        formData.append('fotos', this.campaignForm.value[key]);
      } else {
        formData.append(key, this.campaignForm.value[key]);
      }
    });

    const operation = this.data?.campaign
      ? this.campaignService.updateCampaign(this.data.campaign._id, formData)
      : this.campaignService.createCampaign(formData);

    operation.subscribe({
      next: (campaign) => {
        this.dialogRef.close(campaign);
      },
      error: (err) => {
        console.error('Erro ao salvar campanha:', err);
        this.dialogRef.close();
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.campaignForm.patchValue({ fotos: input.files[0] });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

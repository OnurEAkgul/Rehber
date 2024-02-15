import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RehberService } from '../services/rehber.service';
import { rehberGoruntule } from '../models/rehber-goruntule.model';
import { RehberUpdate } from '../models/rehber-update.model';

@Component({
  selector: 'app-rehber-guncelle',
  templateUrl: './rehber-guncelle.component.html',
  styleUrls: ['./rehber-guncelle.component.css'],
})
export class RehberGuncelleComponent implements OnInit, OnDestroy {
  id: string | null = null;
  kisiBilgi?: rehberGoruntule;
  formSubmitted: boolean = false;

  paramsSubscription?: Subscription;
  editKisiSubscription?: Subscription;
  deleteKisiSubscription?: Subscription;

  deleteInProgress: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private rehberService: RehberService,
    private router: Router
  ) {}

  onFormSubmit(): void {
    this.formSubmitted = true;

    if (this.kisiBilgi) {
      if (
        !this.kisiBilgi.phone ||
        this.kisiBilgi.phone.length !== 11 ||
        !this.kisiBilgi.phone.startsWith('05') ||
        !/^\d+$/.test(this.kisiBilgi.phone.substring(2)) // Check if the remaining part is numeric
      ) {
        alert('Hatalı bir numara girdiniz lütfen tekrar deneyin');
        return;
      }

      // Continue with the rest of your code for name, surname, email validations
      if (!this.isValidName(this.kisiBilgi?.name)) {
        alert('Geçerli bir isim giriniz');
        return;
      }

      if (!this.isValidName(this.kisiBilgi?.surname)) {
        alert('Geçerli bir soyisim giriniz');
        return;
      }

      if (!this.isValidEmail(this.kisiBilgi?.email)) {
        alert('Geçerli bir e-posta adresi giriniz');
        return;
      }
    }

    const rehberUpdate: RehberUpdate = {
      name: this.kisiBilgi?.name ?? '',
      surname: this.kisiBilgi?.surname ?? '',
      email: this.kisiBilgi?.email ?? '',
      phone: this.kisiBilgi?.phone ?? '',
    };

    if (this.id) {
      this.editKisiSubscription = this.rehberService
        .rehberUpdateID(this.id, rehberUpdate)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('islem/goruntule');
          },
        });
    }
  }

  onDelete(): void {
    if (this.id) {
      const isConfirmed = window.confirm('Are you sure you want to delete this user?');

      if (isConfirmed) {
        // Set deleteInProgress to true to disable the delete button and show a spinner
        this.deleteInProgress = true;

        this.deleteKisiSubscription = this.rehberService
          .rehberDeleteID(this.id)
          .subscribe({
            next: (Response) => {
              this.router.navigateByUrl('islem/goruntule');
            },
            complete: () => {
              // Reset deleteInProgress to false when the deletion is complete
              this.deleteInProgress = false;
            },
          });
      }
      // If not confirmed, do nothing
    }
  }

  onNumericInputChange(): void {
    if (!this.formSubmitted && typeof this.kisiBilgi?.phone === 'number') {
      // Use explicit type assertion to ensure TypeScript understands it's a number
      const numericPhone: string = (this.kisiBilgi.phone as number).toString();
  
      // Check if the phone number starts with "05" and is between 2 and 11 digits
      const isValidLength: boolean = numericPhone.length >= 2 && numericPhone.length <= 11;
      const isValidStart: boolean = numericPhone.startsWith('05');
  
      // Update the UI or handle the error based on validation result
      if (isValidLength && !isValidStart) {
        alert('Hatalı bir numara girdiniz lütfen tekrar deneyin');
        return;
      }
  
      // Update the model with the numeric value
      this.kisiBilgi.phone = numericPhone;
    }
  }
  
  

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editKisiSubscription?.unsubscribe();
    this.deleteKisiSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.rehberService.rehberGoruntuleID(this.id).subscribe({
            next: (response) => {
              this.kisiBilgi = response;
            },
          });
        }
      },
    });
  }

  private isValidName(value: string | undefined): boolean {
    return !!value && /^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/.test(value);
  }

  private isValidEmail(value: string | undefined): boolean {
    return !!value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}

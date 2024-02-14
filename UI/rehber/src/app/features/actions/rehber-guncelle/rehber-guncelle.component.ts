import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RehberService } from '../../services/rehber.service';
import { rehberGoruntule } from '../../models/rehber-goruntule.model';
import { RehberUpdate } from '../../models/rehber-update.model';

@Component({
  selector: 'app-rehber-guncelle',
  templateUrl: './rehber-guncelle.component.html',
  styleUrls: ['./rehber-guncelle.component.css'],
})
export class RehberGuncelleComponent implements OnInit, OnDestroy {
  id: string | null = null;
  kisiBilgi?: rehberGoruntule;
  formSubmitted: boolean = false; // Track if the form has been submitted

  paramsSubscription?: Subscription;
  editKisiSubscription?:Subscription;
  deleteKisiSubscription?:Subscription;


  constructor(
    private route: ActivatedRoute,
    private rehberService: RehberService,
    private router:Router
  ) {}

  onFormSubmit(): void {
    // Set the formSubmitted flag to true
    this.formSubmitted = true;

    // Remove non-numeric characters from the phone number
    if (this.kisiBilgi && this.kisiBilgi.phone) {
      this.kisiBilgi.phone = this.kisiBilgi.phone.replace(/[^0-9]/g, '');

      // Validate if the phone number is exactly 11 digits and starts with "05"
      if (
        this.kisiBilgi.phone.length !== 11 ||
        !this.kisiBilgi.phone.startsWith('05')
      ) {
        // Show an error message to the user
        alert('Hatalı bir numara girdiniz lütfen tekrar deneyin');
        return; // Stop the form submission
      }
    }

    const rehberUpdate: RehberUpdate = {
      name: this.kisiBilgi?.name ?? '',
      surname: this.kisiBilgi?.surname ?? '',
      email: this.kisiBilgi?.email ?? '',
      phone: this.kisiBilgi?.phone ?? '',
    };

    // console.log(this.kisiBilgi);
    if(this.id){
      this.editKisiSubscription= this.rehberService.rehberUpdateID(this.id,rehberUpdate).subscribe({
        next: (response) =>{
          this.router.navigateByUrl('islem/goruntule')

        }
      });
    }

  }

  onDelete():void{
    if(this.id){
    this.deleteKisiSubscription = this.rehberService.rehberDeleteID(this.id).subscribe({
      next:(Response) =>{
        this.router.navigateByUrl('islem/goruntule')
      }

    });
  }
  }
  onNumericInputChange(): void {
    // Do not check for validation if the form has been submitted
    if (!this.formSubmitted) {
      // Remove non-numeric characters from the input
      if (this.kisiBilgi && this.kisiBilgi.phone) {
        this.kisiBilgi.phone = this.kisiBilgi.phone.replace(/[^0-9]/g, '');

        // Check if the phone number starts with "05" and is between 2 and 11 digits
        const isValidLength =
          this.kisiBilgi.phone.length >= 2 && this.kisiBilgi.phone.length <= 11;
        const isValidStart = this.kisiBilgi.phone.startsWith('05');

        // Update the UI or handle the error based on validation result
        if (isValidLength && !isValidStart) {
          // Show an error message to the user or handle it according to your UI
          alert('Hatalı bir numara girdiniz lütfen tekrar deneyin');
        }
      }
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
}

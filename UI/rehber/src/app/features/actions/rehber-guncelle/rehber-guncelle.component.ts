import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RehberService } from '../services/rehber.service';
import { rehberGoruntule } from '../models/rehber-goruntule.model';
import { RehberUpdate } from '../models/rehber-update.model';
import { userInformation } from '../../userActions/models/userInfo.model';
import { UserService } from '../../userActions/user.service';

@Component({
  selector: 'app-rehber-guncelle',
  templateUrl: './rehber-guncelle.component.html',
  styleUrls: ['./rehber-guncelle.component.css'],
})
export class RehberGuncelleComponent implements OnInit, OnDestroy {
  id: string | null = null;
  kisiBilgi?: rehberGoruntule;
  formSubmitted: boolean = false;
  user?: userInformation;

  paramsSubscription?: Subscription;
  editKisiSubscription?: Subscription;
  deleteKisiSubscription?: Subscription;

  deleteInProgress: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private rehberService: RehberService,
    private router: Router,
    private userService: UserService
  ) {}

  onFormSubmit(): void {
    this.formSubmitted = true;

    this.user = this.userService.getUserFromLocalStorage();
    if (this.kisiBilgi) {
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
      this.onPhoneCheck();
      console.log(this.onPhoneCheck());
      if (!this.isInvalidPhone(this.kisiBilgi?.phone)) {
        alert('Geçerli bir telefon numarası giriniz');
        return;
      }
    }

    const rehberUpdate: RehberUpdate = {
      name: this.kisiBilgi?.name ?? '',
      surname: this.kisiBilgi?.surname ?? '',
      email: this.kisiBilgi?.email ?? '',
      phone: this.kisiBilgi?.phone ?? '',
      userId: '',
    };

    if (this.id) {
      this.editKisiSubscription = this.rehberService
        .rehberUpdateID(this.id, rehberUpdate)
        .subscribe({
          next: (response) => {
            console.log(this.kisiBilgi?.userId);
            console.log(this.user?.userId);

            if(this.user?.role.includes('adminRole')){
              this.router.navigateByUrl(`admin/islem`);
            }else{
            this.router.navigateByUrl(`islem/goruntule/${this.user?.userId}`);
          }},
        });
    }
  }

  onDelete(): void {
    if (this.id) {
      const isConfirmed = window.confirm(
        'Are you sure you want to delete this user?'
      );

      if (isConfirmed) {
        // Set deleteInProgress to true to disable the delete button and show a spinner
        this.deleteInProgress = true;

        this.deleteKisiSubscription = this.rehberService
          .rehberDeleteID(this.id)
          .subscribe({
            next: (Response) => {
              this.router.navigateByUrl(`islem/goruntule/${this.user?.userId}`);
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

  onPhoneCheck() {
    if (!this.isInvalidPhone(this.kisiBilgi?.phone)) {
      return false;
    }
    return true;
  }
  onNumericInputChange(): void {
    if (!this.formSubmitted && typeof this.kisiBilgi?.phone === 'number') {
      // Update the model with the numeric value
      const numericPhone: string = (this.kisiBilgi.phone as number).toString();

      this.kisiBilgi.phone = numericPhone;
      // Use explicit type assertion to ensure TypeScript understands it's a number
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editKisiSubscription?.unsubscribe();
    this.deleteKisiSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorage();
    // console.log('User from local storage:', this.user);

    if (this.user) {
      // console.log('User ID:', this.user.userId);
    } else {
      // console.log('User is undefined');
    }

    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.user) {
          if (this.id) {
            this.rehberService
              .rehberGoruntuleID(this.user?.userId, this.id)
              .subscribe({
                next: (response) => {
                  this.kisiBilgi = response;
                  //console.log(response);
                },
              });
          }
        } else return;
      },
    });
  }

  private isValidName(value: string | undefined): boolean {
    return !!value && /^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/.test(value);
  }

  private isValidEmail(value: string | undefined): boolean {
    return !!value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  private isInvalidPhone(value: string|undefined): boolean {
    // Check if the entered phone number contains any numeric digits
    return !!value&&/\d/.test(value ?? '');
  }
}

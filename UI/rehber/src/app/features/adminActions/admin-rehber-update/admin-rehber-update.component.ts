import { Component } from '@angular/core';
import { rehberGoruntule } from '../../actions/models/rehber-goruntule.model';
import { userInformation } from '../../userActions/models/userInfo.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RehberService } from '../../actions/services/rehber.service';
import { UserService } from '../../userActions/user.service';
import { RehberUpdate } from '../../actions/models/rehber-update.model';

@Component({
  selector: 'app-admin-rehber-update',
  templateUrl: './admin-rehber-update.component.html',
  styleUrls: ['./admin-rehber-update.component.css']
})
export class AdminRehberUpdateComponent {

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
    private userService:UserService
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
            
            this.router.navigateByUrl(`admin/rehber`);
          },
        });
    }
  }
  onPhoneCheck() {
    if (!this.isInvalidPhone(this.kisiBilgi?.phone)) {
      return false;
    }
    return true;
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
              this.router.navigateByUrl(`admin/rehber`);
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

  // onNumericInputChange(): void {
  //   if (!this.formSubmitted && typeof this.kisiBilgi?.phone === 'number') {
  //     // Use explicit type assertion to ensure TypeScript understands it's a number
  //     const numericPhone: string = (this.kisiBilgi.phone as number).toString();
  
  //     // Check if the phone number starts with "05" and is between 2 and 11 digits
  //     const isValidLength: boolean = numericPhone.length >= 2 && numericPhone.length <= 11;
  //     const isValidStart: boolean = numericPhone.startsWith('05');
  
  //     // Update the UI or handle the error based on validation result
  //     if (isValidLength && !isValidStart) {
  //       alert('Hatalı bir numara girdiniz lütfen tekrar deneyin');
  //       return;
  //     }
  
  //     // Update the model with the numeric value
  //     this.kisiBilgi.phone = numericPhone;
  //   }
  // }
  
  

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

        if(this.user){
        if (this.id) {
          this.rehberService.rehberGoruntuleID(this.user?.userId,this.id).subscribe({
            next: (response) => {
              this.kisiBilgi = response;
              //console.log(response);
            },
          });
        }}
        else return
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

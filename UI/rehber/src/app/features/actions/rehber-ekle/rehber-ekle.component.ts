import { Component, OnDestroy, OnInit } from '@angular/core';
import { rehberRequest } from '../models/liste-ekle.model';
import { RehberService } from '../services/rehber.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../userActions/user.service';
import { userInformation } from '../../userActions/models/userInfo.model';

@Component({
  selector: 'app-rehber-ekle',
  templateUrl: './rehber-ekle.component.html',
  styleUrls: ['./rehber-ekle.component.css'],
})
export class RehberEkleComponent implements OnDestroy,OnInit {
  model: rehberRequest;
  private rehberEkleSubscription?: Subscription;
  formSubmitted: boolean = false; // Track if the form has been submitted
  user?: userInformation;
  constructor(private rehberService: RehberService, private router: Router,private userService:UserService) {
    this.model = {
      name: '',
      surname: '',
      email: '',
      phone: '',
      userId: '',
    };
  }

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorage();
    //console.log('User from local storage:', this.user);
  
    if (this.user) {
     // console.log('User ID:', this.user.userId);
    } else {
     // console.log('User is undefined');
    }
  }

  onFormSubmit() {
    // Set the formSubmitted flag to true
    this.formSubmitted = true;
  
    // Remove non-numeric characters from the phone number
    this.model.phone = this.model.phone.replace(/[^0-9]/g, '');
  
    // Validate if the phone number is exactly 11 digits and starts with "05"
    if (this.model.phone.length !== 11 || !this.model.phone.startsWith('05')) {
      // Show an error message to the user
      alert('Hatalı bir numara girdiniz lütfen tekrar deneyin');
      return; // Stop the form submission
    }
  
    // Additional validation for name, surname, and email
    if (!this.isValidName(this.model.name)) {
      alert('Geçerli bir isim giriniz');
      return;
    }
  
    if (!this.isValidName(this.model.surname)) {
      alert('Geçerli bir soyisim giriniz');
      return;
    }
  
    if (!this.isValidEmail(this.model.email)) {
      alert('Geçerli bir e-posta adresi giriniz');
      return;
    }
  

    if(this.user){
    // Continue with the API call if all validations pass
    this.rehberEkleSubscription = this.rehberService
    .rehberEkle(this.model,this.user.userId)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl(`islem/goruntule/${this.user?.userId}`);
      },
      // error: (error) => {
      //   if (error.status === 409) {
      //     alert('Bu telefon numarası zaten kayıtlı.');
      //   } else {
      //     console.error('Unexpected error:', error);
      //   }
      // }
    });
  }}
  
  // Helper method to validate name and surname
  private isValidName(value: string): boolean {
    // Add your validation logic here
    // For example, you can check if the name/surname contains only letters
    return /^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/.test(value);
  }
  
  // Helper method to validate email
  private isValidEmail(value: string): boolean {
    // Add your email validation logic here
    // For simplicity, this example uses a basic email pattern
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  onNumericInputChange(): void {
    // Do not check for validation if the form has been submitted
    if (!this.formSubmitted) {
      // Remove non-numeric characters from the input
      this.model.phone = this.model.phone.replace(/[^0-9]/g, '');

      // Check if the phone number starts with "05" and is between 2 and 11 digits
      const isValidLength =
        this.model.phone.length >= 2 && this.model.phone.length <= 11;
      const isValidStart = this.model.phone.startsWith('05');

      // Update the UI or handle the error based on validation result
      if (isValidLength && !isValidStart) {
        // Show an error message to the user or handle it according to your UI
        alert('Hatalı bir numara girdiniz lütfen tekrar deneyin');
      }
    }
  }

  ngOnDestroy(): void {
    this.rehberEkleSubscription?.unsubscribe();
  }
}

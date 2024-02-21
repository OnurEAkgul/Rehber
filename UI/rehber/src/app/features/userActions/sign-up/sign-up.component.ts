import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { userSignup } from '../models/signup.model'; // Update import
import { signupRequest } from '../models/user-signup-request.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnDestroy {
  model: signupRequest; // Update type
  private signUpSubscription?: Subscription;

  constructor(private userService: UserService, private router: Router) {
    this.model = {
      userName: '',
      userPassword: '',
      userEmail: '',
      userId:''
    };
  }

  ngOnDestroy(): void {
    this.signUpSubscription?.unsubscribe();
  }

  formSubmitted = false;

  onSignUp() {
    this.formSubmitted = true;

    // Check if the email is in a valid format
    if (!this.isValidEmailFormat(this.model.userEmail)) {
      alert('Invalid email format. Please enter a valid email address.');
      return;
    }

    // You can add further validation and sign-up logic here.
    if (this.isValidForm()) {
      // Perform sign-up logic, e.g., send data to the server or handle registration
      this.signUpSubscription = this.userService.userEkle(this.model).subscribe({
        next: (response) => {
          alert('Sign-up successful!'); // Provide a success message

          this.router.navigateByUrl('userislem/giris')
          console.log(response)
          // Now you can use the retrieved userId for navigation
         // const userId = response.userId;
         // this.router.navigate(['/userislem/info', userId]);
        },
        error: (error) => {
          // Handle error appropriately, e.g., show a specific error message based on the error status
          if (error.status === 409) {
            alert('This email is already registered. Please use a different email address.');
          } else {
            console.error('Unexpected error:', error);
          }
        },
      });
    }
  }

  isValidEmailFormat(email: string): boolean {
    // Use a regular expression to check if the email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidForm(): boolean {
    // Add additional validation logic if needed
    return !!(this.model.userName && this.model.userEmail && this.model.userPassword);
  }
}

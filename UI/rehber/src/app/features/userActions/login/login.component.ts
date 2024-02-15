import { Component } from '@angular/core';
import { userLogin } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  model: userLogin = {
    userEmail: '',
    userPassword: ''
  };

  formSubmitted = false;

  onSignIn() {
    this.formSubmitted = true;

    // You can add further validation and sign-in logic here.
    if (this.isValidForm()) {
      // Perform sign-in logic, e.g., send data to server or handle authentication
      console.log('Sign in successful:', this.model);
    }
  }

  isValidForm(): boolean {
    // Add additional validation logic if needed
    return !!(this.model.userEmail && this.model.userPassword);
  }

}

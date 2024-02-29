import { Component, OnInit } from '@angular/core';
import { userLogin } from '../models/login.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { userInformation } from '../models/userInfo.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: userLogin;
  userInfo?: userInformation;
  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.model = {
      userName:'',
      userEmail: '',
      userPassword: '',
    };
  }

  ngOnInit(): void {

    const autoSignInEmail = localStorage.getItem('autoSignInEmail');
    const autoSignInPassword = localStorage.getItem('autoSignInPassword');

    if (autoSignInEmail && autoSignInPassword) {
      this.model.userEmail=autoSignInEmail;
      this.model.userPassword=autoSignInPassword;


      localStorage.removeItem('autoSignInEmail');
      localStorage.removeItem('autoSignInPassword');
    }


    this.userInfo= this.userService.getUserFromLocalStorage();
    // console.log(this.userInfo)
    if (this.userInfo) {
      if (this.userInfo.role.includes('adminRole')) {
        // console.log(this.userInfo)
        this.router.navigateByUrl('admin/rehber');
      } else {
        // console.log(this.userInfo)
        this.router.navigateByUrl(`islem/goruntule/${this.userInfo.userId}`);
      }
    }
  }
  



  formSubmitted = false;
  onSignIn() {
    this.formSubmitted = true;
    // You can add further validation and sign-in logic here.
    if (this.isValidForm()) {
      this.userService.userLogin(this.model).subscribe({
        next: (response) => {
          // Alert for successful login
          this.cookieService.set(
            'Authorization',
            `Bearer ${response.token}`
          );

          //set local user
          this.userService.setUser({
            userId: response.userId,
            userEmail:response.userEmail,
            userName: response.userName,
            role: response.role,
            token: response.token,
          });
          if (response.role.includes('adminRole')) {
            this.router.navigate(['admin/rehber']);
            alert('Login successful!');
          } else {
            alert('Login successful!');
            // console.log('info'+response.userId);
            this.router.navigate(['islem/goruntule/', response.userId]);
          }
          // this.router.navigate(['/userislem/info', response.userId]);

          // Your existing success logic here
        },
        error: (error) => {
          
          // console.error('Sign in failed:', error);

          // Provide user-friendly error messages based on the error received
          if (error.status === 401) {
            // Alert for invalid credentials
            alert('Invalid email or password');
          } else {
            // Alert for other errors
            alert('Sign in failed. Please try again.');
          }
        },
      });
    }
  }
  isValidForm(): boolean {
    // Add additional validation logic if needed
    return !!(this.model.userEmail && this.model.userPassword);
  }
}

import { Component } from '@angular/core';
import { userLogin } from '../models/login.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

model:userLogin;
constructor(private userService:UserService,  private router: Router, private cookieService:CookieService){

  this.model= {
    userEmail: '',    
    userPassword: ''
  };


}

  formSubmitted = false;
  onSignIn() {
    this.formSubmitted = true;
    // You can add further validation and sign-in logic here.
    if (this.isValidForm()) {
      // Perform sign-in logic, e.g., send data to server or handle authentication
      
      this.userService.userLogin(this.model).subscribe({
        next:(response)=>{
          //console.log('Sign in successful:', response);
          //set auth cookie first
          this.cookieService.set('Authorization',`Bearer ${response.token}`,
          undefined,'/',undefined,true,'Strict');

          //set local user
          this.userService.setUser({
            userId: response.userId,
            userEmail: response.userEmail,
            role: response.role,
            token: response.token, 
          });
          
          this.router.navigate(['islem/goruntule',response.userId]);
         // this.router.navigate(['/userislem/info', response.userId]);

        }
      });
    }
  }
  isValidForm(): boolean {
    // Add additional validation logic if needed
    return !!(this.model.userEmail && this.model.userPassword);
  }
}

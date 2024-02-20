import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { userRequest } from '../../models/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnDestroy {
  model: userRequest;
  private signUpSubscription?: Subscription;

  newPassword: string = '';
  formSubmitted = false;

  constructor(private userService: UserService, private router: Router) {
    this.model = {
      userId: '',
      userName: '',
      userPassword: '',
      userEmail: '',
    };
  }

  onChangeInfo(): void {
    // Implement the logic to change the password here
    // For example, you can call a service method to update the user's password
    if (this.model.userId && this.newPassword) {
      this.userService.userUpdateID(this.model.userId, {
        userName: this.model.userName,
        userEmail: this.model.userEmail,
        userPassword: this.newPassword,
      }).subscribe({
        next: () => {
          alert('User information updated successfully!');
        },
        error: (error) => {
          console.error('Error updating user information:', error);
        },
      });
    } else {
      alert('Invalid user or new password');
    }
  }

  ngOnDestroy(): void {
    this.signUpSubscription?.unsubscribe();
  }

  isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidForm(): boolean {
    return !!(this.model.userName && this.model.userEmail && this.model.userPassword);
  }
}

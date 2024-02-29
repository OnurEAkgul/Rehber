import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../user.service';
import { UserUpdate } from '../../models/user-update.model';
import { userRequest } from '../../models/user.model';
import {  Router } from '@angular/router';
import { userInformation } from '../../models/userInfo.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit, OnDestroy {
  model: userRequest;
  userLocal?:userInformation;
  private userInfoSubscription?: Subscription;

  newPassword: string = '';
  currentPassword: string = '';
  formSubmitted = false;
  isEditMode = false;

  constructor(private userService: UserService, private router: Router) {
    this.model = {
      userId: '',
      userName: '',
      userPassword: '',
      userEmail: '',
    };
  }

  ngOnInit(): void {
    
    const userId = this.userService.getUserFromLocalStorage()?.userId;

    if (userId) {
      this.userInfoSubscription = this.userService.userGoruntuleID(userId).subscribe({
        next: (user) => {
          this.model = user;
          
          // console.log(this.model);
        },
        error: (error) => {
          console.error('Error fetching user information:', error);
        },
      });
    }

    this.isEditMode = false;
  }

  changePassword = false;

  onChangeInfo(): void {
    if (this.model.userId && this.currentPassword) {
      // Prepare the update object with mandatory fields
      const updateObject: UserUpdate = {
        userName: this.model.userName,
        userEmail: this.model.userEmail,
        currentPassword: this.currentPassword, // Include the current password
      };

      // Include newPassword if changePassword is true
      if (this.changePassword && this.newPassword) {
        updateObject.newPassword = this.newPassword;
      }

      // Proceed with the update
      this.userService.userUpdateID(this.model.userId, updateObject).subscribe({
        next: () => {
          alert('User information updated successfully!');
          localStorage.removeItem('userName');
          localStorage.removeItem('userEmail');
          localStorage.setItem('userName',this.model.userName);
          localStorage.setItem('userEmail',this.model.userEmail);
               },
        error: (error) => {
          console.error('Error updating user information:', error);
        },
      });
    } else {
      alert('Invalid user or current password');
    }
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  ngOnDestroy(): void {
    this.userInfoSubscription?.unsubscribe();
  }

  isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidForm(): boolean {
    if (this.isEditMode) {
      return !!(
        this.model.userName ||
        this.model.userEmail ||
        this.newPassword ||
        this.currentPassword
      );
    } else {
      return !!(
        this.model.userName &&
        this.model.userEmail &&
        this.newPassword &&
        this.currentPassword
      );
    }
  }

  onDelete(): void {
    const isConfirmed = window.confirm('Are you sure you want to delete your account?');

    console.log("112")
    if (isConfirmed) {
      console.log("114")
      this.userService.deleteUserID(this.model.userId).subscribe({
        next: () => {
          console.log("117")
          this.userLogout();
          console.log("120")
          // You can add any additional logic or redirection after successful deletion
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          // Handle error, show appropriate message to the user
        },
      });
    }
  }


  userLogout(): void {
    alert('User deleted successfully');
    this.userService.logout();
    this.userLocal = undefined; 
    console.log(this.userLocal); 
    this.router.navigateByUrl('');
    alert('Çıkış yapıldı');
  }

}

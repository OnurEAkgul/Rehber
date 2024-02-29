import { Component } from '@angular/core';
import { UserUpdate } from '../../userActions/models/user-update.model';
import { UserService } from '../../userActions/user.service';
import { Subscription } from 'rxjs';
import { userRequest } from '../../userActions/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-update',
  templateUrl: './admin-user-update.component.html',
  styleUrls: ['./admin-user-update.component.css'],
})
export class AdminUserUpdateComponent {
  userModel: userRequest;
  private userInfoSubscription?: Subscription;

  formSubmitted = false;
  isEditMode = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.userModel = {
      userId: '',
      userName: '',
      userEmail: '',
      userPassword: '',
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId') || '';
      console.log('User ID:', userId);

      if (userId) {
        this.userInfoSubscription = this.userService.userGoruntuleID(userId).subscribe({
          next: (user) => {
            this.userModel = user;
          },
          error: (error) => {
            console.error('Error fetching user information:', error);
          },
        });
      }
    });
    this.isEditMode = false;
  }

  onChangeInfo(): void {
    const updateObject: UserUpdate = {
      userName: this.userModel.userName,
      userEmail: this.userModel.userEmail,
      currentPassword: this.userModel.userPassword
    };

    this.userService.userUpdateID(this.userModel.userId, updateObject).subscribe({
      next: () => {
        alert('User information updated successfully!');
        this.router.navigateByUrl('admin/user');
      },
      error: (error) => {
        console.error('Error updating user information:', error);
      },
    });
  }

  onDelete(): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');

    if (isConfirmed) {
      this.userService.deleteUserID(this.userModel.userId).subscribe({
        next: () => {
          alert('User deleted successfully!');
          this.router.navigateByUrl('admin/user');
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        },
      });
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
    return !!(
      this.userModel.userName ||
      this.userModel.userEmail
    );
  }
}

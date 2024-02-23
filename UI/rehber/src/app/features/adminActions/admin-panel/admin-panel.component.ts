import { Component, OnInit } from '@angular/core';
import { userRequest } from '../../userActions/models/user.model';
import { adminService } from '../services/admin.service';
import { Observable, of } from 'rxjs';
import { rehberGoruntule } from '../../actions/models/rehber-goruntule.model';
import { FilterService } from 'primeng/api';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  searchRehberTerm?: string;
  searchUserTerm?: string;
  rehberId: string | undefined;
  userRequests$: Observable<userRequest[]> | undefined;
  rehberList$: Observable<rehberGoruntule[]> | undefined;
  deleteInProgress: boolean = false;
  showRehberDetails: boolean = false;
  selectedPerson?: rehberGoruntule | undefined;;
  showUserDetails: boolean = false;
  selectedUser?: userRequest | undefined;;



  constructor(
    private adminService: adminService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.rehberList$ = this.adminService.rehberGoruntule();

    this.userRequests$ = this.adminService.userGoruntule();
  }

  onUserSearch(): void {
    if (this.userRequests$ && this.searchUserTerm !== undefined) {
      this.userRequests$.subscribe((userRequests) => {
        this.userRequests$ = of(
          this.filterService.filter(
            userRequests,
            ['userId', 'userName', 'userEmail', 'userPassword'],
            this.searchUserTerm,
            'contains'
          )
        );
      });
    } else {
      this.userRequests$ = this.adminService.userGoruntule();
    }
  }

  onRehberClick(person: rehberGoruntule): void {
    this.selectedPerson = person;
    this.showRehberDetails = true;
    this.showUserDetails = false;
    
  }
   goBackToRehberList(): void {
    this.showRehberDetails = false;
    this.showUserDetails = false;
  }
  onUserClick(person: userRequest): void {
    this.selectedUser = person;
    this.showRehberDetails = false;
    this.showUserDetails = true;
  }
   goBackToUserList(): void {
    this.showUserDetails = false;
    this.showRehberDetails = false;
  }

  onRehberSearch(): void {
    if (this.rehberList$ && this.searchRehberTerm !== undefined) {
      this.rehberList$.subscribe((rehberList) => {
        this.rehberList$ = of(
          this.filterService.filter(
            rehberList,
            ['id','name', 'surname', 'email', 'phone','userId'], 
            this.searchRehberTerm,
            'contains'
          )
        );
      });
    } else {
      this.rehberList$ = this.adminService.rehberGoruntule();
    }
  }

  onRehberDelete(entryId: string | undefined): void {
    // Check if entryId is defined before proceeding
    if (entryId !== undefined) {
      const isConfirmed = window.confirm(
        'Are you sure you want to delete this user?'
      );

      if (isConfirmed) {
        this.deleteInProgress = true;

        this.adminService.rehberDeleteID(entryId || '').subscribe({
          next: (response) => {
            // Optionally handle the response
            console.log('Deletion successful:', response);

            // Assign the updated rehberList$ after deletion
            this.rehberList$ = this.adminService.rehberGoruntule();
            // Redirect to the desired route after deletion
          },
          error: (error) => {
            console.error('Error deleting entry:', error);
          },
          complete: () => {
            // Reset deleteInProgress to false when the deletion is complete
            this.deleteInProgress = false;
          },
        });
      }
    }
  }
  onUserDelete(entryId: string | undefined): void {
    // Check if entryId is defined before proceeding
    if (entryId !== undefined) {
      const isConfirmed = window.confirm(
        'Are you sure you want to delete this user?'
      );

      if (isConfirmed) {
        this.deleteInProgress = true;

        this.adminService.deleteUserID(entryId || '').subscribe({
          next: (response) => {
            // Optionally handle the response
            console.log('Deletion successful:', response);

            this.userRequests$ = this.adminService.userGoruntule();
          },
          error: (error) => {
            console.error('Error deleting entry:', error);
          },
          complete: () => {
            // Reset deleteInProgress to false when the deletion is complete
            this.deleteInProgress = false;
          },
        });
      }
    }
  }
}

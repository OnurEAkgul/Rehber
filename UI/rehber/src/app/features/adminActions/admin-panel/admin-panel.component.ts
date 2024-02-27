import { Component, OnInit } from '@angular/core';
import { userRequest } from '../../userActions/models/user.model';
import { adminService } from '../services/admin.service';
import { Observable, of, switchMap, take } from 'rxjs';
import { rehberGoruntule } from '../../actions/models/rehber-goruntule.model';
import { FilterService } from 'primeng/api';
import { coreServices } from 'src/app/core/services/core-services.service';
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
    private coreService: coreServices,
  ) {}

  ngOnInit(): void {
    this.rehberList$ = this.adminService.rehberGoruntule();

    this.userRequests$ = this.adminService.userGoruntule();
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

  clearRehberFilters(): void {
    this.searchRehberTerm = '';  // Clear the search term
    this.onRehberSearch();  // Trigger the search to display the original list
  }
  clearUserFilters(): void {
    this.searchUserTerm = '';  // Clear the search term
    this.onUserSearch();  // Trigger the search to display the original list
  }

  onUserSearch(): void {
    this.userRequests$ = this.adminService.userGoruntule().pipe(
      switchMap(userRequests => {
        if (this.searchUserTerm && this.searchUserTerm.trim() !== '') {
          const filteredList = this.coreService.filter(
            userRequests,
            ['userId', 'userName', 'userEmail', 'userPassword'],
            this.searchUserTerm,
            'contains'
          );
          return of(filteredList);
        } else {
          return of(userRequests);
        }
      })
    );
  }
  

  onRehberSearch(): void {
    this.rehberList$ = this.adminService.rehberGoruntule().pipe(
      switchMap(rehberList => {
        if (this.searchRehberTerm && this.searchRehberTerm.trim() !== '') {
          const filteredList = this.coreService.filter(
            rehberList,
            ['id', 'name', 'surname', 'email', 'phone', 'userId'],
            this.searchRehberTerm,
            'contains'
          );
          return of(filteredList);
        } else {
          return of(rehberList);
        }
      })
    );
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

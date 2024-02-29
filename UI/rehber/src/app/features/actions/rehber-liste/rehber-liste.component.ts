import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RehberService } from '../services/rehber.service';
import { rehberGoruntule } from '../models/rehber-goruntule.model';
import {
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { userInformation } from '../../userActions/models/userInfo.model';
import { UserService } from '../../userActions/user.service';
import { Router } from '@angular/router';
import { FilterService } from 'primeng/api';;
import { coreServices } from 'src/app/core/services/core-services.service';

@Component({
  selector: 'app-rehber-liste',
  templateUrl: './rehber-liste.component.html',
  styleUrls: ['./rehber-liste.component.css'],
})
export class RehberListeComponent implements OnInit {
  searchTerm: string = '';
  id: string | undefined;
  rehberList$: Observable<rehberGoruntule[]> | undefined;
  user?: userInformation;
  deleteInProgress: boolean = false;
  showDetails: boolean = false;
  rehberCount: number = 0;
  selectedPerson: rehberGoruntule | undefined;
  // loading: boolean = false;
 

  constructor(
    private rehberService: RehberService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private coreService: coreServices
  ) {}

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.user = this.userService.getUserFromLocalStorage();
    
    if (this.user) {
      this.rehberList$ = this.rehberService.rehberGoruntuleWhereId(
        this.user.userId
      );
      this.rehberList$.subscribe({
        next: (response) => {
          // console.log(response);
         
          this.rehberCount = response.length;
          // console.log(rehberCount)
        },
      });
    } else {
    }

   

  }

  onDelete(entryId: string | undefined): void {
    // Check if entryId is defined before proceeding
    if (entryId !== undefined) {
      const isConfirmed = window.confirm(
        'Are you sure you want to delete this user?'
      );

      if (isConfirmed) {
        this.deleteInProgress = true;

        this.rehberService.rehberDeleteID(entryId || '').subscribe({
          next: (response) => {
            // Optionally handle the response
            console.log('Deletion successful:', response);

            // Assign the updated rehberList$ after deletion
            if (this.user) {
              this.rehberList$ = this.rehberService.rehberGoruntuleWhereId(
                this.user.userId
              );
            }
            // Redirect to the desired route after deletion
            this.router.navigateByUrl(`/islem/goruntule/${this.user?.userId}`);
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

  onRowClick(person: rehberGoruntule): void {
    this.selectedPerson = person;
    this.showDetails = true;
  }
  goBackToList(): void {
    this.showDetails = false;
    // Optionally, you can reset the selectedPerson here if needed.
  }

  clearFilters(): void {
    this.searchTerm = ''; // Clear the search term
    this.onSearch(); // Trigger the search to display the original list
  }

  onSearch(): void {
    if (this.user) {
      this.rehberList$ = this.rehberService
        .rehberGoruntuleWhereId(this.user.userId)
        .pipe(
          switchMap((rehberList) => {
            if (this.searchTerm && this.searchTerm.trim() !== '') {
              const filteredList = this.coreService.filter(
                rehberList,
                ['name', 'surname', 'email', 'phone'],
                this.searchTerm,
                'contains'
              );
              return of(filteredList);
            } else {
              return of(rehberList);
            }
          })
        );
    }
  }
}

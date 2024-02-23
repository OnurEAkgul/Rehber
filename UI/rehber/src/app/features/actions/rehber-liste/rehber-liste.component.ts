import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RehberService } from '../services/rehber.service';
import { rehberGoruntule } from '../models/rehber-goruntule.model';
import { Observable, of } from 'rxjs';
import { userInformation } from '../../userActions/models/userInfo.model';
import { UserService } from '../../userActions/user.service';
import { Router } from '@angular/router';
import { FilterService } from 'primeng/api';
import { FormsModule } from '@angular/forms';


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
  selectedPerson: rehberGoruntule | undefined;
  // loading: boolean = false;

  constructor(
    private rehberService: RehberService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private filterService: FilterService
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
          //console.log(response);
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

  onSearch(): void {
    if (this.rehberList$ && this.searchTerm) {
      this.rehberList$.subscribe(rehberList => {
        this.rehberList$ = of(
          this.filterService.filter(
            rehberList,
            ['name', 'surname', 'email', 'phone'], // Include 'phone' in the fields to filter
            this.searchTerm,
            'contains'
          )
        );
      });
    } else {
      if (this.user) {
        this.rehberList$ = this.rehberService.rehberGoruntuleWhereId(
          this.user.userId
        );
      }
    }
  }
}

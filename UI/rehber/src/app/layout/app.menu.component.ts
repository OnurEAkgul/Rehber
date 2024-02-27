import { OnInit, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { userInformation } from '../features/userActions/models/userInfo.model';
import { UserService } from '../features/userActions/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit, OnDestroy {
  user?: userInformation;
  model: any[] = [];
  private userSubscription: Subscription | undefined;

  constructor(
    public layoutService: LayoutService,
    private userService: UserService
  ) {}

  ngOnInit() {
    
    // Fetch user data from the service
    this.userSubscription = this.userService.user().subscribe({
      next: (response) => {
        this.user = response;
        console.log(this.user)
        this.model = [];
      this.updateMenu();
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      },
    });
    this.user = this.userService.getUserFromLocalStorage();
    console.log(this.user);
    
    this.model = [];
    this.updateMenu();
    
  }

  ngOnDestroy() {
    // Unsubscribe from the user subscription to avoid memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
      this.updateMenu();
    }
  }

  private updateMenu() {
    console.log(this.user);
    if (this.user == null) {
        this.model = [];
        this.model = [
            {
              label: 'İşlemler',
              items: [
                {
                  label: 'Kayıt ol',
                  icon: 'pi pi-fw pi-id-card',
                  routerLink: ['kayit'],
                },
                {
                  label: 'Giriş Yap',
                  icon: 'pi pi-fw pi-check-square',
                  routerLink: ['/'],
                },
              ],
            },]
      return;
    }

    // Update the menu based on user information
    
    this.model = [];
    this.model.push(
      {
        label: 'İşlemler',
        items: [
          {
            label: 'Kişi Ekle',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/islem/kaydet', this.user?.userId],
          },
          {
            label: 'Kişileri Görüntüle',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['/islem/goruntule', this.user?.userId],
          },
        ],
      });

    if (this.user?.role.includes('adminRole')) {
      this.model = [];
      this.model.push({
        label: 'İşlemler',
        items: [
          {
            label: 'Admin Paneli',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/admin/islem'],
          },
        ],
      });
    }
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { userInformation } from '../features/userActions/models/userInfo.model';
import { UserService } from '../features/userActions/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    user?: userInformation;
    

    constructor(public layoutService: LayoutService,private userService: UserService,private router: Router) { }


    ngOnInit(): void {
        //eğer kullanıcı giriş yapmadıysa giriş yapılması isteniyor
        this.userService.user().subscribe({
          next: (response) => {
            //console.log(response);
            this.user = response;
          },
        });
        //eğer kullanıcı girişi varsa boş olan kısıma atanıyor, hali hazırda kullanıcı varsa yine aynı şekilde veri tanımlaması yapılıyor
        this.user = this.userService.getUserFromLocalStorage();
        
      }

      userLogout(): void {
        if(this.user==null){
            return
        }
        this.userService.logout();
        this.user = undefined; // Make sure to set user to undefined
       // console.log(this.user); // Add a console log to check the user value
        this.router.navigateByUrl('');
        alert('Çıkış yapıldı');
      }
}

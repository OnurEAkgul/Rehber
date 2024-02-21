import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userRequest } from 'src/app/features/userActions/models/user.model';
import { userInformation } from 'src/app/features/userActions/models/userInfo.model';
import { UserService } from 'src/app/features/userActions/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user?: userInformation;

  constructor(private userService: UserService, private router: Router) {}

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
    this.userService.logout();
    this.user = undefined; // Make sure to set user to undefined
   // console.log(this.user); // Add a console log to check the user value
    this.router.navigateByUrl('');
    alert('Çıkış yapıldı');
  }
}

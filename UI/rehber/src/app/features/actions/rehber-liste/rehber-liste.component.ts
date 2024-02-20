import { Component, OnInit } from '@angular/core';
import { RehberService } from '../services/rehber.service';
import { rehberGoruntule } from '../models/rehber-goruntule.model';
import { Observable } from 'rxjs';
import { userInformation } from '../../userActions/models/userInfo.model';
import { UserService } from '../../userActions/user.service';

@Component({
  selector: 'app-rehber-liste',
  templateUrl: './rehber-liste.component.html',
  styleUrls: ['./rehber-liste.component.css']
})
export class RehberListeComponent implements OnInit {


  rehberList$?: Observable<rehberGoruntule[]>;
  user?: userInformation;
  /*user() : Observable< userInformation | undefined >{
    return this.$userInfo.asObservable(); 
  }*/
  
  constructor(private rehberService:RehberService, private userService:UserService){

  }
  

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorage();
    //console.log('User from local storage:', this.user);
  
    if (this.user) {
      //console.log('User ID:', this.user.userId);
      this.rehberList$ = this.rehberService.rehberGoruntuleWhereId(this.user.userId);
    } else {
      //console.log('User is undefined');
    }
  }
  

//    this.rehberList$ = this.rehberService.rehberGoruntuleWhereId();
  


}
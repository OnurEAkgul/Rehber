import { Component, OnInit } from '@angular/core';
import { userRequest } from '../../userActions/models/user.model';
import { adminService } from '../services/admin.service';
import { Observable } from 'rxjs';
import { rehberGoruntule } from '../../actions/models/rehber-goruntule.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  
  userRequests$?: Observable<userRequest[]>;
  rehberList$?: Observable<rehberGoruntule[]>;

  constructor(private adminService: adminService) { }

  ngOnInit(): void {

    this.rehberList$ = this.adminService.rehberGoruntule();

    this.userRequests$ = this.adminService.userGoruntule();
    
  }
}

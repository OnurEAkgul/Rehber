import { Component, OnInit } from '@angular/core';
import { RehberService } from '../services/rehber.service';
import { rehberGoruntule } from '../models/rehber-goruntule.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rehber-liste',
  templateUrl: './rehber-liste.component.html',
  styleUrls: ['./rehber-liste.component.css']
})
export class RehberListeComponent implements OnInit {


  rehberList$?: Observable<rehberGoruntule[]>;
  
  constructor(private rehberService:RehberService){

  }

  ngOnInit(): void {
    this.rehberList$ = this.rehberService.rehberGoruntule();
  }

}

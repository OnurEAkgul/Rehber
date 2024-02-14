import { Injectable } from '@angular/core';
import { rehberRequest } from '../models/liste-ekle.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { rehberGoruntule } from '../models/rehber-goruntule.model';
 import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RehberService {

  constructor(private http: HttpClient) { }

  rehberEkle(model: rehberRequest): Observable<void> {

    return this.http.post<void>(`${environment.apiBaseUrl}/api/Rehber`,model)

  }

  rehberGoruntule(): Observable<rehberGoruntule[]> {
    return this.http.get<rehberGoruntule[]>(`${environment.apiBaseUrl}/api/Rehber`);

  }
}

import { Injectable } from '@angular/core';
import { rehberRequest } from '../models/liste-ekle.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { rehberGoruntule } from '../models/rehber-goruntule.model';
import { environment } from 'src/environments/environment';
import { RehberUpdate } from '../models/rehber-update.model';

@Injectable({
  providedIn: 'root',
})
export class RehberService {
  constructor(private http: HttpClient) {}

  rehberEkle(model: rehberRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Rehber`, model);
  }

  rehberGoruntule(): Observable<rehberGoruntule[]> {
    return this.http.get<rehberGoruntule[]>(
      `${environment.apiBaseUrl}/api/Rehber`
    );
  }

  rehberGoruntuleID(id: string): Observable<rehberGoruntule> {
    return this.http.get<rehberGoruntule>(
      `${environment.apiBaseUrl}/api/Rehber/${id}`
    );
  }

  rehberUpdateID(
    id: string,
    rehberUpdate: RehberUpdate
  ): Observable<rehberGoruntule> {
    return this.http.put<rehberGoruntule>(
      `${environment.apiBaseUrl}/api/Rehber/${id}`,
      rehberUpdate
    );
  }

  rehberDeleteID(id: string): Observable<rehberGoruntule> {
    return this.http.delete<rehberGoruntule>(
      `${environment.apiBaseUrl}/api/Rehber/${id}`
    );
  }
}

import { Injectable } from '@angular/core';
import { rehberRequest } from '../models/liste-ekle.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { rehberGoruntule } from '../models/rehber-goruntule.model';
import { environment } from 'src/environments/environment';
import { RehberUpdate } from '../models/rehber-update.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class RehberService {
  constructor(private http: HttpClient, private cookieService:CookieService) {}

  //HTTP GET ALL METODU
  rehberGoruntule(): Observable<rehberGoruntule[]> {
    return this.http.get<rehberGoruntule[]>(
      `${environment.apiBaseUrl}/api/Rehber/all?addAuth=true`
      // ,{headers:{
      //   'Authorization':this.cookieService.get('Authorization')
      // }}
    );
  }

  //HTTP USERID YE EŞİT OLANLARI GETİRME
  rehberGoruntuleWhereId(userId: string): Observable<rehberGoruntule[]> {
    return this.http.get<rehberGoruntule[]>(
      `${environment.apiBaseUrl}/api/Rehber/${userId}?addAuth=true`
      // ,{headers:{
      //   'Authorization':this.cookieService.get('Authorization')
      // }}
    );
  }

  //HTTP USER ID NİN İÇİNDEKİ İD YE GÖRE GETİRME
  rehberGoruntuleID(userId: string, id: string): Observable<rehberGoruntule> {
    return this.http.get<rehberGoruntule>(
      `${environment.apiBaseUrl}/api/Rehber/${userId}/${id}?addAuth=true`
      // ,{headers:{
      //   'Authorization':this.cookieService.get('Authorization')
      // }}
    );
  }

  //HTTP POST METODU
  rehberEkle(model: rehberRequest, userId: string): Observable<void> {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/api/Rehber/${userId}?addAuth=true`,
      model
      // ,{headers:{
      //   'Authorization':this.cookieService.get('Authorization')
      // }}
    );
  }

  //HTTP PUT METODU
  rehberUpdateID(
    id: string,
    rehberUpdate: RehberUpdate
  ): Observable<rehberGoruntule> {
    return this.http.put<rehberGoruntule>(
      `${environment.apiBaseUrl}/api/Rehber/${id}?addAuth=true`,
      rehberUpdate
    );
  }

  //HTTP DELETE METODU
  rehberDeleteID(id: string): Observable<rehberGoruntule> {
    return this.http.delete<rehberGoruntule>(
      `${environment.apiBaseUrl}/api/Rehber/${id}?addAuth=true`
      // ,{headers:{
      //   'Authorization':this.cookieService.get('Authorization')
      // }}
    );
  }
}

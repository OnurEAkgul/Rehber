import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { rehberGoruntule } from '../../actions/models/rehber-goruntule.model';
import { RehberUpdate } from '../../actions/models/rehber-update.model';
import { environment } from 'src/environments/environment';
import { rehberRequest } from '../../actions/models/liste-ekle.model';
import { Observable } from 'rxjs';
import { userRequest } from '../../userActions/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class adminService {

  constructor(private http: HttpClient, private cookieService:CookieService) { }
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

  //HTTP GET METODU ALL
  userGoruntule(): Observable<userRequest[]> {
    return this.http.get<userRequest[]>(
      `${environment.apiBaseUrl}/api/user/all`
      // ?addAuth=true
    );
  }

  deleteUserID(userId: string): Observable<userRequest> {
    return this.http.delete<userRequest>(
      `${environment.apiBaseUrl}/api/user/DeleteUser/${userId}?addAuth=true`
    );
  }


}

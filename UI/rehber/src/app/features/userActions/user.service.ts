import { Injectable } from '@angular/core';
import { userLogin } from './models/login.model';
import { userSignup } from './models/signup.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userRequest } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userEkle(model: userSignup): Observable<userRequest> {
    return this.http.post<userRequest>(`${environment.apiBaseUrl}/api/user/`, model);
  }

  rehberGoruntuleID(id: string): Observable<userLogin> {
    return this.http.get<userLogin>(
      `${environment.apiBaseUrl}/api/user/${id}`
    );
  }


}

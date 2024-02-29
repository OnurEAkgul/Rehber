import { Injectable } from '@angular/core';
import { userLogin } from './models/login.model';
import { userSignup } from './models/signup.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userRequest } from './models/user.model';
import { UserUpdate } from './models/user-update.model';
import { signupRequest } from './models/user-signup-request.model';
import { loginResponse } from './models/loginRespone.model';
import { userInformation } from './models/userInfo.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  $userInfo = new BehaviorSubject<userInformation | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  userEkle(model: signupRequest): Observable<userRequest> {
    return this.http.post<userRequest>(
      `${environment.apiBaseUrl}/api/user/CreateUser`,
      model
    );
  }

  userLogin(model: userLogin): Observable<loginResponse> {
    return this.http.post<loginResponse>(
      `${environment.apiBaseUrl}/api/user/Login`,
      {
        userEmail: model.userEmail,
        userPassword: model.userPassword,
      }
    );
  }

  setUser(user: userInformation): void {
    this.$userInfo.next(user);
    localStorage.setItem('user', JSON.stringify(user));

    // localStorage.setItem('userEmail',user.userEmail);
    // localStorage.setItem('userName', user.userName);
    // localStorage.setItem('userId', user.userId);
    // localStorage.setItem('token', user.token);
    // localStorage.setItem('role', user.role.join(','));
  }

  getUserFromLocalStorage(): userInformation | undefined {
    const userString = localStorage.getItem('user');
    if (!userString) return undefined;

    return JSON.parse(userString) as userInformation;
    // const userEmail = localStorage.getItem('userEmail');
    // const userName = localStorage.getItem('userName');
    // const userId = localStorage.getItem('userId');
    // const token = localStorage.getItem('token');
    // const roleString = localStorage.getItem('role');

    // if (userEmail&&userName && userId && token && roleString) {
    //   const roles = roleString.split(','); // Convert comma-separated string to array
    //   return { userEmail,userId, userName, token, role: roles };
    // }

    // If any of the required information is missing, return 'undefined'
    return undefined;
  }
  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization');
    this.$userInfo.next(undefined);
  }
  user(): Observable<userInformation | undefined> {
    return this.$userInfo.asObservable();
  }

  userGoruntuleID(userId: string): Observable<userRequest> {
    return this.http.get<userRequest>(
      `${environment.apiBaseUrl}/api/user/${userId}?addAuth=true`
    );
  }

  userGoruntule(): Observable<userRequest[]> {
    return this.http.get<userRequest[]>(
      `${environment.apiBaseUrl}/api/user/all?addAuth=true`
    );
  }

  userUpdateID(
    userId: string,
    userUpdate: UserUpdate
  ): Observable<userRequest> {
    return this.http.put<userRequest>(
      `${environment.apiBaseUrl}/api/user/UpdateUser/${userId}?addAuth=true`,
      userUpdate
    );
  }
  /*
  userDeleteID(id: string): Observable<userRequest> {
    return this.http.delete<userRequest>(
      `${environment.apiBaseUrl}/api/user/${id}?addAuth=true`
    );
  }
*/
  deleteUserID(userId: string): Observable<userRequest> {
    return this.http.delete<userRequest>(
      `${environment.apiBaseUrl}/api/user/DeleteUser/${userId}?addAuth=true`
    );
  }

  /**/
}

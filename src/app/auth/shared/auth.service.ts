import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignupRequestPayload } from '../signup/signup.request.payload';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoginRequest } from '../login/login.request.payload';
import { LoginResponse } from '../login/login.response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { Constants } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  
  
  logout() {
    this.httpClient.post(Constants.BASE_URL + '/auth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
        this.loggedIn.emit(false);
      }, error => {
        throwError(error);
      })
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
  public static BASE_URL = Constants.BASE_URL;

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequest : SignupRequestPayload) : Observable<any> {
    return this.httpClient.post(AuthService.BASE_URL + '/auth/signup', signupRequest, {responseType: 'text'});
  }

  login(loginRequest : LoginRequest) : Observable<boolean> {
    return this.httpClient.post<LoginResponse> (AuthService.BASE_URL + '/auth/login', loginRequest)
              .pipe(map(data => {
                  this.localStorage.store('authenticationToken', data.authenticationToken)
                  this.localStorage.store('username', data.username)
                  this.localStorage.store('refreshToken', data.refreshToken)
                  this.localStorage.store('expiresAt', data.expiresAt)
                  this.loggedIn.emit(true);
                  this.username.emit(this.getUserName());
                  return true;
              }))
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    }
    return this.httpClient.post<LoginResponse>(AuthService.BASE_URL + '/auth/refresh/token',
      refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  getJwtToken() : string {
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken() : string{
    return this.localStorage.retrieve('refreshToken');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getExpirationTime() {
    return this.localStorage.retrieve('expiresAt');
  }

}

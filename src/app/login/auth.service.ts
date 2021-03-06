import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    }
    else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    else {
      return new Usuario();
    }
  };

  public get token(): string {
    if (this._token != null) {
      return this._token;
    }
    else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    else {
      return null;
    }
  };

  public get roles(): string {
    if (this._usuario.roles != null) {
      return this._usuario.roles.toString();
    }
    else if (this._usuario.roles.toString() == null && sessionStorage.getItem('roles') != null) {
      this._token = sessionStorage.getItem('roles');
      return this._usuario.roles.toString();
    }
    else {
      return null;
    }
  };

  login(usuario: Usuario): Observable<any> {

    const urlEndPoint = 'http://localhost:8080/oauth/token';

    const credentials = btoa('pmd' + ':' + 'ibm123456');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credentials
    });

    let params = new URLSearchParams();

    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    console.log(params.toString());

    return this.http.post<any>(urlEndPoint, params.toString(), { headers: httpHeaders });
  }

  userSave(accessToken: string): void {
    let payload = this.getTokenData(accessToken);
    this._usuario = new Usuario();
    this._usuario.username = payload.user_name;
    this._usuario.email = payload.email;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
    sessionStorage.setItem('roles', JSON.stringify(this._usuario.roles))
  }

  tokenSave(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  getTokenData(accessToken: string): any {

    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    else {
      return null;
    }

  }

  isAuthenticated(): boolean {
    let payload = this.getTokenData(this.token);

    if (payload != null && payload.user_name && payload.user_name.length>0) {
      return true;
    }
    return false;
  }
  
  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }

}

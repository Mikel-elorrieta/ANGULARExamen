import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/users';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth !: IUser | undefined;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.baseUrl}/login`, { email, password } );
  }

  guardar(auth: IUser) {
    this._auth = auth;
    localStorage.setItem('auth', JSON.stringify(auth));
  }

  logeatutaDago(): boolean {

    if (this._auth) {
      return true;
    }

    this._auth = this.cargarUsuarioDesdeLocalStorage();
    if (this._auth) {
      return true;
    }

    return false;
  }

  private cargarUsuarioDesdeLocalStorage(): IUser | undefined {
    const usuario = localStorage.getItem('auth');
    return usuario ? JSON.parse(usuario) : undefined;
  }

  logout() {
    this._auth = undefined;
    localStorage.removeItem('auth');
    this.router.navigate(['']);
  }

  get auth(): IUser | undefined {
    return { ...this._auth! };
  }
}

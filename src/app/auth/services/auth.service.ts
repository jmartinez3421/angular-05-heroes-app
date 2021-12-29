import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpointUrl: string = environment.endpointUrl;

  private _auth: Auth | undefined;

  get auth():Auth{
    return {...this._auth!};
  }

  constructor(private http: HttpClient) { }

  verificarAuth(): Observable<boolean>{
    if(!localStorage.getItem('id')){
      return of(false);//Transforma el boolean en un Observable de tipo boolean
    }

    return this.http.get<Auth>(`${this.endpointUrl}/usuarios/1`)
                    .pipe(
                      map( auth => {
                        this._auth = auth;
                        return true;
                      } )
                    )
  }

  login(): Observable<Auth>{
    return this.http.get<Auth>(`${this.endpointUrl}/usuarios/1`)
                    .pipe(
                      tap( resp => this._auth = resp),
                      tap( auth => localStorage.setItem('id', auth.id) )
                    );
  }

  logout(){
    localStorage.removeItem('id');
    this._auth = undefined;
  }
}

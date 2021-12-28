import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
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

  login(): Observable<Auth>{
    return this.http.get<Auth>(`${this.endpointUrl}/usuarios/1`)
                    .pipe(
                      tap( resp => this._auth = resp)
                    );
  }
}

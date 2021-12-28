import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private endpointUrl: string = environment.endpointUrl;

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.endpointUrl}/heroes`);
  }

  getHeroePorId(id: string): Observable<Hero>{
    return this.http.get<Hero>(`${this.endpointUrl}/heroes/${id}`)
  }

  getSugerencias( termino: string ): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.endpointUrl}/heroes?q=${termino}&_limit=6`);
  }

  createHero( hero: Hero ): Observable<Hero> {
    return this.http.post<Hero>(`${this.endpointUrl}/heroes`, hero);
  }

  actualizarHero( hero: Hero ):Observable<Hero>{
    return this.http.put<Hero>(`${this.endpointUrl}/heroes/${hero.id}`, hero);
  }

  deleteHero( id: string ): Observable<any>{
    return this.http.delete<any>(`${this.endpointUrl}/heroes/${id}`);
  }
}

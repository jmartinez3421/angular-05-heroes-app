import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Hero[] = [];

  heroeSeleccionado: Hero | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroesService.getSugerencias(this.termino.trim())
      .subscribe(heroes => this.heroes = heroes);
  }

  opcionSeleccionada(e: MatAutocompleteSelectedEvent) {

    if (e.option.value !== '') {
      const hero: Hero = e.option.value;
      this.termino = hero.superhero;

      this.heroesService.getHeroePorId(hero.id!)
        .subscribe(hero => this.heroeSeleccionado = hero);
    }else{
      this.heroeSeleccionado = undefined;
    }

  }

}

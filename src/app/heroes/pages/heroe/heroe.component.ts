import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img{
      width: 75%;
      border-radius: 10px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  hero!: Hero;

  constructor( 
    private route: ActivatedRoute,
    private heroesService: HeroesService,
    private location: Location
  ) { }

  ngOnInit(): void {

    // this.route.params.subscribe( ({id}) =>{
    //   this.heroesService.getHeroePorId(id).subscribe( hero => {this.hero = hero; console.log(hero)})
    // } );

    this.route.params
        .pipe(
          switchMap(({id}) => this.heroesService.getHeroePorId(id))
        )
        .subscribe( hero => this.hero = hero);

  }

  volver(){
    this.location.back();
  }

}

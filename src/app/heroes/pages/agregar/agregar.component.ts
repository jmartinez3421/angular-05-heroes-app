import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 90%;
      border-radius: 10px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel'
    }
  ]

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {

    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.heroesService.getHeroePorId(id))
        )
        .subscribe(hero => this.hero = hero);
    }

  }

  guardar() {
    if (this.hero.superhero.trim().length === 0) {
      return;
    }

    if (this.hero.id) {
      this.heroesService.actualizarHero(this.hero)
        .subscribe(hero => this.mostrarSnackBar('Heroe actualizado'));
    } else {
      this.heroesService.createHero(this.hero)
        .subscribe(hero => {
          this.router.navigate(['/heroes/editar', hero.id]);
          this.mostrarSnackBar('Heroe creado correctamente');
        });
    }
  }

  borrar() {

    const dialog = this.matDialog.open(ConfirmarComponent, {
      width: '300px',
      data: { ...this.hero }
    });

    dialog.afterClosed().subscribe(
      (resp) => {
        if (resp) {
          this.heroesService.deleteHero(this.hero.id!).subscribe(resp => {
            this.location.back();
          })
        }
      }
    )


  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'X', {
      duration: 2000
    })
  }

}

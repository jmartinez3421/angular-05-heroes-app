import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(hero: Hero): string {
    return `assets/heroes/${hero.id}.jpg`;
  }

}

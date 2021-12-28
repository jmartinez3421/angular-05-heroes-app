import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  pure: false //Lo ponemos así para que se dispare cada vez que el ciclo de vida de angular se dispare
})
export class ImagenPipe implements PipeTransform {

  transform(hero: Hero): string {
    
    if(!hero.id && !hero.alt_img){
      return 'assets/no-image.png';
    } else if(hero.alt_img){
      return hero.alt_img.trim();
    }else if(hero.alt_img === ''){
      return 'assets/no-image.png';
    }
    return `assets/heroes/${hero.id}.jpg`;

  }

}

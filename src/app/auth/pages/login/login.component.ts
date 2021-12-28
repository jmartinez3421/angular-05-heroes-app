import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent{

  constructor(
    private router: Router,
    private auth: AuthService
  ){}

  login(){
    this.auth.login()
        .subscribe( resp => {
          if(resp.id){
            this.router.navigate(['./heroes']);
          }
        } )

    // this.router.navigate(['./heroes']);
  }
}

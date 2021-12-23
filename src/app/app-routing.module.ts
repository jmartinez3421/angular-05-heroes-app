import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './shared/error.component';


const routes: Routes = [
  {
    path: '404',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

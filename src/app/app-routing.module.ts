import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//modulos
import { PagesRoutingModule } from "./pages/pages.routing";
import { AuthRoutingModule } from "./auth/auth.routing";

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesModule } from './pages/pages.module';



const routes: Routes = [
  
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: NopagefoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

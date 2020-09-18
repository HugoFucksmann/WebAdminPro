import { AuthGuard } from './../guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from '../pages/pages.component';


const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        canLoad: [ AuthGuard ],
        loadChildren: () => import('./child-routes.module').then( modulo => modulo.ChildRoutesModule )
      },

];

@NgModule({
    imports: [RouterModule.forChild(routes) ],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

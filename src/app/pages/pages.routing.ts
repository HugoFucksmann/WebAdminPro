import { AuthGuard } from './../guards/auth.guard';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



import { PagesComponent } from '../pages/pages.component';
import { Grafica1Component } from '../pages/grafica1/grafica1.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          {path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
          {path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }  },
          {path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica #1' }  },
          {path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes' }  },
          {path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }  },
          {path: 'RXJS', component: RxjsComponent, data: { titulo: 'RXJS' }  }
          
    
        ]
      },

];

@NgModule({
    imports: [RouterModule.forChild(routes)   
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

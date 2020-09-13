import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



import { PromesasComponent } from './promesas/promesas.component';
import { Grafica1Component } from '../pages/grafica1/grafica1.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminGuard } from './../guards/admin.guard';

//mantenimientos
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';


const childRoutes: Routes = [
  {path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  {path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'busquedas' }  },
  {path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }  },
  {path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica #1' }  },
  {path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes' }  },
  {path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }  },
  {path: 'RXJS', component: RxjsComponent, data: { titulo: 'RXJS' }  },
  {path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }  },
  
  // Mantenimientos
  {path: 'hospitales', component: HospitalesComponent, data: { titulo: 'mantenimiento hospitales' }},
  {path: 'medicos', component: MedicosComponent, data: { titulo: 'mantenimiento medicos' }},
  {path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Gestionar medicos' }},

  //Rutas de Admin
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'mantenimiento usuarios' } },
  ];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

const routes: Routes = [

    //path: '/dashboard' PagesRouting
    //path: '/auth' authRouting
    
    
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},

    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}

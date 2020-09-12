import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PagesModule } from '../app/pages/pages.module';
import { AuthModule } from '../app/auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';





@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

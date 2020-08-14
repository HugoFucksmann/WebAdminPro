import { SettingsService } from './../services/settings.service';
import { Component, OnInit } from '@angular/core';

declare function customFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private SettingsService:SettingsService ) { }

  ngOnInit(): void {

    customFunctions();
  }
  
}

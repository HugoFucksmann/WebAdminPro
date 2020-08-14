import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor(private SidebarService:SidebarService) { 

    this.menuItems = SidebarService.menu;
  }

  ngOnInit(): void {
  }

}

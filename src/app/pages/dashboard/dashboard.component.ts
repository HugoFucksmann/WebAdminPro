import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  matarAtodos(){

    alert('hola mundo!');
    console.log("hola pablo, la matrix te esta llamado");

    
  }  

  
}

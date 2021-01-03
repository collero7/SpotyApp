import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  desplegar: string;

  constructor() {
    this.desplegar = 'hide';
    console.log('entroo')
  }

  ngOnInit(): void {
  }

}

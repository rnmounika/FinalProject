import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public data :DataService) { }
//  lin=false;
  ngOnInit(): void {
    // this.lin = this.data.loggedIn
  }

  logout() {
    this.data.logout();
   }
}

import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Chart } from 'chart.js';
import * as d3 from 'd3';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit  {

  constructor(private http: HttpClient, public data: DataService,private router: Router) { }
  ngOnInit(): void {

    // this.decodedJwt = null; //this.jwt && this.jwtHelper.decodeToken(this.jwt);
    // var s = this.data.validate( this.jwt );
    // s.subscribe((res) => {
    //     console.log( res )
    // })
  }

}

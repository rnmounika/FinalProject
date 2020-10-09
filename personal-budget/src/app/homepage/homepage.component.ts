import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  public dataSource = {
    datasets: [
        {
            data : [],
            backgroundColor :[
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#d0743c',
                '#ff8c00',
                '#6b486b'

            ],
        }
    ],
    labels: [

    ]
};

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for ( let i = 0 ; i < res.myBudget.length; i++)
      {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;

      }
      this.createChart();

    });
  }

  createChart()  {
      var ctx= document.getElementById('myChart');
      var myPieChart = new Chart(ctx,{
          type : 'pie',
          data : this.dataSource
      });
  }

}

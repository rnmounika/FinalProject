import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Chart } from 'chart.js';
import * as d3 from 'd3';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent  {


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

//////
private data = [
  {"Framework": "Vue", "Stars": "166443"},
  {"Framework": "React", "Stars": "150793"},
  {"Framework": "Angular", "Stars": "62342"},
  {"Framework": "Backbone", "Stars": "27647"},
  {"Framework": "Ember", "Stars": "21471"},
];
private svg;
private margin = 50;
private width = 750;
private height = 500;
// The radius of the pie chart is half the smallest side
private radius = Math.min(this.width, this.height) / 2 - this.margin;
private colors;
private jsonData=[];

/////

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for ( let i = 0 ; i < res.myBudget.length; i++)
      {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;

      }

      for(let i=0; i< this.dataSource.labels.length ; i++ )
      {
        var thisData={
        "label": this.dataSource.labels[i],
        "value": this.dataSource.datasets[0].data[i]
      }

       this.jsonData.push(thisData);
       }
      console.log(this.jsonData);
      this.createChart();
      this.createSvg();
      this.createColors();
      this.drawChart();

    });


  }
  createChart()  {
      var ctx= document.getElementById('myChart');
      var myPieChart = new Chart(ctx,{
          type : 'pie',
          data : this.dataSource
      });
  }
  //////
  private createSvg(): void {
    this.svg = d3.select("#viz_area")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}

private createColors(): void {
  this.colors = d3.scaleOrdinal()
  // .domain(this.dataSource.labels)
  .range([ '#ffcd56',
  '#ff6384',
  '#36a2eb',
  '#fd6b19',
  '#d0743c',
  '#ff8c00',
  '#6b486b']);
}
private drawChart(): void {
 const pie = d3.pie<any>().value(function(d) { return  d.value; });
  this.svg
  .selectAll('pieces')
  .data(pie(this.jsonData))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius)
  )
  .attr('fill', (d, i) => (this.colors(i)))
  .attr("stroke", "#121926")
  .style("stroke-width", "1px");

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);

  this.svg
  .selectAll('pieces')
 .data(pie(this.jsonData))
  .enter()
  .append('text')
  .text(d => d.data.label)
  .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "middle")
  .style("font-size", 15);

}

}

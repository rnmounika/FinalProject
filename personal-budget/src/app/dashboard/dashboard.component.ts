import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Chart } from 'chart.js';
import * as d3 from 'd3';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailValidator } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';
import { first } from 'rxjs/operators';

@Component({
  selector: 'pb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public actualValue: number;
  public title: string;
  public expectedValue: number;



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


private svg;
private margin = 50;
private width = 600;
private height = 400;
// The radius of the pie chart is half the smallest side
private radius = Math.min(this.width, this.height) / 2 - this.margin;
private colors;
private jsonData=[];
public expectedData=[];
private jwt: string;
private email;
public bud;
public editedIndex=-1;
public existingItem=false;
public missingValues=false;
private token;

  constructor(private http: HttpClient, public data: DataService,private router: Router,private route: ActivatedRoute) {
    // this.route
    // .data
    // .subscribe(value => {
    //   console.log(value);
    //   this.email =value
    // } );

  }
  submitted = false;
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.email = params['email'];
      // (+) converts string 'id' to a number
     console.log(this.email)
    //   if (!isNaN(this.id)) {
    //    // logic here to check if id is something and put logic accordingly
     });

    setInterval(()=>{
      // console.log("setInterval")
             this.onTokenExpired()
        }, 6500)

    // this.jwt = localStorage.getItem('id_token');

  }
updateMethod(i: number){
this.editedIndex=i
}

updateValueToDB(item: Object)
{
  console.log(item)

  if(item["value"] === null || item["expectedBudget"]===null || item["value"] =="" || item["expectedBudget"]=="")
  {

    location.reload();
  }
  else{

    this.data.updateBudgetData(item["email"],item["title"],item["value"],item["expectedBudget"])
    .pipe(first())
     .subscribe(data => {
      if(data.success)
      {

        location.reload()

        // this.router.navigate(['/dashboard',item["email"]]);
      }
      else{
        return;
      }
     })

  }


}
  // saveTutorial(): void {
  //   const data = {
  //     title: this.tutorial.title,
  //     description: this.tutorial.description
  //   };

  //   this.data.create(data)
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this.submitted = true;
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  buttonClicked() {


    this.data.addBudgetData(this.email,this.title,this.actualValue,this.expectedValue,"#3360FF")
    .pipe(first())
   .subscribe(data => {
    if(data.success)
    {
      location.reload()
      // this.router.navigate(['/dashboard',item["email"]]);
    }
    else{
      if(data.err.code==11000)
      {
        this.existingItem=true
        return;
      }
      return;
    }
   });

    //if you want to clear input
    this.title = null;
    this.expectedValue = null;
    this.actualValue = null;
  }

  onTokenExpired() {
    const token = localStorage.getItem('jwt111');
    const refreshToken= localStorage.getItem('refreshToken');
        try {
               console.log(token)

                var base64Url = token.split('.')[1];
                var decodedValue = JSON.parse(window.atob(base64Url));
                    console.log(decodedValue);
                    if(Date.now() < decodedValue.exp * 1000){
                      return true;
                  }
                  else
                  {
                    console.log("teken")

                    localStorage.removeItem('jwt111');
                    this.data.isloggedIn=false
                    this.router.navigate(['/login']);

                  }
                // if (Date.now() < decodedValue.exp * 1000)
                // {
                //   //  console.log("abc")
                //     return true;
                // }
                // var dateNow = new Date();
                // console.log(decodedValue.exp)
                // console.log(dateNow.getTime())
                //  if(decodedValue.exp*1000 == dateNow.getTime()-30)
                // {
                //   console.log("Refresh")
                //   this.data.getRefreshToken(this.email,refreshToken)
                //   .pipe(first())
                //   .subscribe(data => {
                //    if(data.success)
                //    {
                //      console.log(data.token)
                //      return true;
                //     //  location.reload()
                //      // this.router.navigate(['/dashboard',item["email"]]);
                //    }
                //    else{
                //               return false;
                //    }
                //   });

                // }
                // else if(Date.now() < decodedValue.exp * 1000){
                //     return true;
                // }
                // else
                // {
                //   console.log("teken")

                //   localStorage.removeItem('jwt111');
                //   this.data.isloggedIn=false
                //   this.router.navigate(['/login']);

                // }
              // if(token ==null)
              // {
              //   this.router.navigate(['/home']);
              // }
              // else{

              // }

            }

    catch (err) {
        console.log(err);
      return null;
    }

  }
  editUser = function(user) {
    //angular.extend(lastEditedUser,user);
   this.editMode = true;
    // $scope.sort = undefined;
  }

  cancel = function(user) {
    // getAllUsers();
   this.editMode = false;
    location.reload();


    //angular.extend(user,lastEditedUser);
  }

  ngAfterViewInit(): void {

    try {
      this.data.getBudgetData(this.email,)
   .subscribe((res: any) => {

      this.bud=res;
     for ( let i = 0 ; i < res.length; i++)
     {
         // this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
         // this.dataSource.labels[i] = res.myBudget[i].title;
         this.dataSource.datasets[0].data[i] =res[i].value;
         this.dataSource.labels[i]= res[i].title;
        //  this.dataSource.datasets[0].backgroundColor[i] = res[i].color;
         this.expectedData[i]=res[i].expectedBudget;
        //  this.ac
        //  var thisData={
        //    "label": this.dataSource.labels[i],
        //    "value": this.dataSource.datasets[0].data[i]
        //  }
        var thisData={
          "actualValue": this.dataSource.datasets[0].data[i],
          "expectedValue": this.expectedData[i]
        }
          this.jsonData.push(thisData);

     }

     console.log(this.jsonData);
     this.createChart();
    //  this.createSvg();
     this.createColors();
    //  this.drawChart();
     this.createBar(this.jsonData)

   });

    } catch (error) {
 console.log("dashboard error")
    }

 }



 deleteBudget(item : Object){
   this.data.deleteBudgetData(item["email"],item["title"])
   .pipe(first())
   .subscribe(data => {
    if(data.success)
    {
      location.reload()
      // this.router.navigate(['/dashboard',item["email"]]);
    }
   })

  // console.log(item["email"] +"  "+item["title"])

 }

 createBar(item){
   console.log(this.expectedData);
   console.log(this.dataSource.datasets[0].data);
  var densityCanvas = document.getElementById("densityChart");
  var densityData = {
    label: 'Expected Budget Data',
    data: this.expectedData,
    backgroundColor: 'rgba(0, 99, 132, 0.6)',
    borderColor: 'rgba(0, 99, 132, 1)',
    // yAxisID: "y-axis-gravity"
  };

  var gravityData = {
    label: 'Actual Budget Data',
    data: this.dataSource.datasets[0].data,
    backgroundColor: 'rgba(99, 132, 0, 0.6)',
    borderColor: 'rgba(99, 132, 0, 1)',
    // yAxisID: "y-axis-gravity"
  };

   var planetData = {
    labels:this.dataSource.labels,
    datasets: [densityData, gravityData]
  };
  var chartOptions = {
    scales: {
      xAxes: [{
        barPercentage: 1,
        categoryPercentage: 0.3
      }],
      yAxes: [{
        id: "y-axis-gravity",
        ticks: {
          // max: 1,
          min: 0
        }
      }, {
        id: "y-axis-gravity",
        ticks: {
          // max: 1,
          min: 0
        }

      }]
      // yAxes: [{
      //   id: "y-axis-density"
      // }, {
      //   id: "y-axis-gravity"
      // }]
    }
  };
   // var ctx= document.getElementById('chartContainer');
 var barChart = new Chart(densityCanvas, {
   height:20,
   width:20,
    type: 'bar',
    data: planetData,
     options: chartOptions
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
 // var colors= this.dataSource.datasets[0].backgroundColor;
//  this.colors = d3.scaleOrdinal().range(this.dataSource.datasets[0].backgroundColor)
 // .domain(this.dataSource.labels)
 // .range([ '#ffcd56',
 // '#ff6384',
 // '#36a2eb',
 // '#fd6b19',
 // '#d0743c',
 // '#ff8c00',
 // '#6b486b']);
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

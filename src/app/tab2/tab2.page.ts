import { Component, ViewChild } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Chart } from 'chart.js';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  {

  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;  

  

  poids: any;
  taille : any;

  imc : number;
  couleur:any;
  ideal:number;
  min:number;
  max:number;

  constructor(private route: ActivatedRoute,private location: Location) {}
  //...
  sub = this.route.params.subscribe(params => {
       this.poids = params['poids'].replace('/./','');
       this.taille = params['taille'].replace('.','');
       
       
   this.imc = (this.poids/(this.taille * this.taille)*10000);  
   
   //poids idéal formule de Broca
   this.ideal = (this.taille - 100);

   //imc mini
   this.min = ((18.5 * this.poids)/this.imc)+1;
   this.max = ((25 * this.poids)/this.imc);


       
  });

  myBackButton(){
    this.location.back();
  }
   

  ionViewDidEnter() {
    this.createBarChart();
  }

  

 

  createBarChart() {
   


    if(this.imc < 18.49){
      this.couleur = 'blue';
    }
    if(this.imc > 18.49 && this.imc < 25.01){
      this.couleur = 'green';
    }
    if(this.imc > 25){
      this.couleur = 'red';
    }


    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Insuffisant','Normal','Surpoids'],
        datasets: [{
          label: 'Votre IMC',
          showInLegend: false,  
          data: [0,this.imc,40 - this.imc],
          backgroundColor: [
            'blue',
            this.couleur,
            'white'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 0)'
      ],
          borderWidth: 1
        }]
      },
    
      options: {
        legend: {
          display:false,
          labels: {
              fontColor: 'rgb(255, 99, 132)'
          }
      },
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        scales: {
          xAxes: [{
            suggestedMin:0,
            suggestedMax:50,
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });





  }

  


}

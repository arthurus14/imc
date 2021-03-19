import { Component, ViewChild } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Chart } from 'chart.js';
//import { Storage } from '@ionic/storage';

//import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import '@capacitor-community/sqlite';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
 



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

  name:[];

  id:number;
  jour:Date;
  valeur:number;



  donnee: Array<string> = [];

  //private db: SQLiteObject;

  constructor(private route: ActivatedRoute,private location: Location,private sqlite: SQLite) {

    //this.setStorage();
    //this.getStorage();

    this.createDb();
    //this.setNative();
    //this.getNative();
  }

  createDb():void{
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
        db.executeSql('create table IF NOT EXISTS imc(`id` int(11) NOT NULL,`poids` int(11) NOT NULL,`jours` date NOT NULL )', [])
          .then(() => console.log('Table créée'))
          .catch(e => console.log(e));
    
    
      })
      .catch(e => console.log(e));
  }



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
/*
  setStorage(){

  
    this.route.params.subscribe(params => {
      this.poids = params['poids'].replace('/./','');
     
      var date = new Date();
let today:Date;
     today= new Date();
      let dd = today.getDate();

      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();

      this.storage.set('imc',{
      
        'date' : `${dd}-${mm}-${yyyy}`,
        //'date' : '20-03-2021',
        'poids' : this.poids
      }
      );


  //Il réérit sur l'index 4
      
 });

 
    
  }
  */
/*
  getStorage(){
  
    this.storage.get('imc').then((val) => {
      console.log('date est :', val.date);
      console.log('poids est :', val.poids);

   
  //créer table avec date et poids
      this.storage.forEach((key, imc, index) => {
        console.log("clé "+key.poids+" val: "+key.date+" index: "+index);
      });
    });

   
  }
*/

//


//
 

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

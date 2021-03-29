import { Component, ViewChild } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Chart } from 'chart.js';

import '@capacitor-community/sqlite';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';




@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild('barChart') barChart;

  bars: any;

  donnees:string[] = [];
  jour:string[] = [];

  private db:SQLiteObject;

  constructor(private route: ActivatedRoute,private location: Location,private sqlite: SQLite) {

   this.appelBDD();
   //this.createBarChart();

  }

 private appelBDD():void{
  this.sqlite.create({
    name: 'data.db',
    location: 'default'
  })
    .then((db: SQLiteObject) => {

      this.db =db;

      db.executeSql('create table IF NOT EXISTS imc(	"id"	INTEGER, "poids"	INTEGER,"jour"	NUMERIC,PRIMARY KEY("id" AUTOINCREMENT))',[])
        .then(() => console.log('Table créée'))
        .catch(e => alert("erreur"+JSON.stringify(e)));

    })
    .catch(e => alert(e));
}



ionViewDidEnter() {
  this.createBarChart();
}

createBarChart() {


  //remise à zero du graphique quand on quitte la page

 var donnees:string[] = [];
 var  jour:string[] = [];

this.db.executeSql("SELECT * FROM imc",[])
    .then((data) =>{

      if(data == null){

        return;
      }
     if(data.rows){

      this.donnees = [];
      this.jour = [];

        if(data.rows.length > 0){

          for(var i = 0; i < data.rows.length; i++){
           this.donnees.push(data.rows.item(i).poids);
           this.jour.push(data.rows.item(i).jour);
          }
        
          this.bars = new Chart(this.barChart.nativeElement, {
            type: 'line',
            data: {
              labels: this.jour,
              datasets: [{
                label: 'Enregistrement de votre poids',
                data: this.donnees,
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1
              }
             ]
            },
            options: {
              legend: {
                display:false,
                labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            },
              scales: {
                xAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          }); 

        }
      
      }
      
    })
    .catch(e => alert(JSON.stringify(e)));


}
}

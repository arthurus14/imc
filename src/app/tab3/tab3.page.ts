import { Component, ViewChild } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Chart } from 'chart.js';
//import { Storage } from '@ionic/storage';

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
   //this.data();
   //this.demo();
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
        .then(() => alert('Table créée'))
        .catch(e => alert("erreur"+JSON.stringify(e)));
  
        //alert('Base de données créée');
    })
    .catch(e => alert(e));
}

data(){
  alert('appel fonction');
 
    this.db.executeSql("SELECT * FROM imc",[])
    .then((data) =>{
        alert('lecture bdd');
      if(data == null){
        alert('pas de données enregistrées');
        return;
      }
     if(data.rows){
        alert('afficher données');

//
        if(data.rows.length > 0){

          var d :any;
          for(var i = 0; i < data.rows.length; i++){
          return d += this.donnees.push(data.rows.item(i));
           // this.jour.push(data.rows.item(i).jours);
          }
          JSON.parse(d);
        
          alert('données affichées d'+d);
        }
        
        
      }
      
    

    })
    .catch(e => alert(JSON.stringify(e)));

    this.createBarChart();
    
}






ionViewDidEnter() {
 // this.createBarChart();
}




createBarChart() {

 //appeler fonction data() puis appeler le createBarChart
 //this.data();

 var donnees:string[] = [];
 var  jour:string[] = [];

  alert("fonction jour JSON : "+this.donnees);
  //alert("fonction jour values() : "+this.donnees.values());
  alert("fonction jour map : "+this.donnees.map(e => e));
  
//
this.db.executeSql("SELECT * FROM imc",[])
    .then((data) =>{
        alert('lecture bdd');
      if(data == null){
        alert('pas de données enregistrées');
        return;
      }
     if(data.rows){
        alert('afficher données');

//
        if(data.rows.length > 0){

          for(var i = 0; i < data.rows.length; i++){
           this.donnees.push(data.rows.item(i).poids);
           this.jour.push(data.rows.item(i).jour);
          }
        
          alert('jour '+this.jour); 
        
          this.bars = new Chart(this.barChart.nativeElement, {
            type: 'line',
            data: {
              labels: this.jour,
              datasets: [{
                label: 'Online viewers in millions',
                data: this.donnees,
                backgroundColor: '#ddee44', // array should have same number of elements as number of dataset
                borderColor: '#ddee44',// array should have same number of elements as number of dataset
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
                  //suggestedMin:0,
                  //suggestedMax:50,
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


  
    


  //

}
}

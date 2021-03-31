import { Component, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Chart } from 'chart.js';

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
  //jour:Date;
  valeur:number;

  donnees:string[] = [];


  donnee: Array<string> = [];

  jour:string[] = [];

  private db:SQLiteObject;

  constructor(private route: ActivatedRoute,private location: Location,private sqlite: SQLite,public alertController: AlertController) {

    this.createDb();
  }

 private createDb():void{
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

  saveDb(){

    let today:Date;
     today= new Date();
      let dd = today.getDate();

      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();
     let date = `${dd}-${mm}-${yyyy}`;


this.db.executeSql("SELECT * FROM imc ORDER BY id DESC LIMIT 1",[])
.then((data) =>{
  




  if(data.rows.length > 0){


    console.log('length '+data.rows.length);
     //Affiche 1
     console.log('jour d = '+data);

     //console.log('jour data read = '+data.jour.read());

     //console.log("data "+data.value());
     console.log("data "+data.jour);

    var d :any;

    //console.log("data = "+JSON.parse(data.jour));
    //console.log("data item 1 = "+data.item(1));
    //console.log("data item 1 jour = "+data.item(1).jour);
    

    for(var i = 0; i < data.rows.length; i++){
     //d += this.donnees.push(data.rows.item(i));

     var item = data.rows.item(i).jour;

     //alert("item "+item);


     d = this.jour.push(data.rows.item(i).jour);

   

      
    
    }

    

    if(item == date){
  
      this.presentAlertConfirm(this.poids,date);
   }
   else{
    this.db.executeSql("INSERT INTO imc('poids', 'jour') VALUES (\""+this.poids+"\",'"+date+"')",[])
    .then(() => console.log('Données enregistrées'))
    .catch(e => alert(JSON.stringify(e)));
    this.presentAlert();
  }
    //JSON.parse(d);
  
  }
    
 
})
}



//
async presentAlertConfirm(poids,date) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Attention',
    message: 'Message <strong>Vous avez déjà enregistrer votre poids ce jour</strong>!!!',
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Voulez vous modfier votre poids ?',
        handler: () => {
          //Requête update
          this.db.executeSql('UPDATE imc SET poids = ?  WHERE jour = ? ',[poids,date])
          .then(() => console.log('Données enregistrées en bdd'))
          .catch(e => console.log(JSON.stringify(e)));
        }
      }
    ]
  });

  await alert.present();
}

async presentAlert() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Alert',
    subHeader: 'Félicitation',
    message: 'Votre poids a été enregistré',
    buttons: ['OK']
  });

  await alert.present();
}



retrieveData(){
  
    this.db.executeSql("SELECT * FROM imc",[])
    .then((data) =>{      
      if(data == null){
        return;
      }
      if(data.rows){
       
        if(data.rows.length > 0){
          for(var i = 0; i < data.rows.length; i++){
            this.donnees.push(data.rows.item(i).poids);
            //this.donnees.push(data.rows.item(i).jours);
          }
        }
      }
    })
    .catch(e => alert(JSON.stringify(e)));
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

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

  donnees:string[] = [];

  private db:SQLiteObject;

  constructor(private route: ActivatedRoute,private location: Location,private sqlite: SQLite) {

   this.appelBDD();
   // this.data();

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
        if(data.rows.length > 0){
          for(var i = 0; i < data.rows.length; i++){
            this.donnees.push(data.rows.item(i).poids);
            //this.donnees.push(data.rows.item(i).jours);
          }
        }
        
        alert('données affichées '+data.rows.item(i).poids);
      }
     
    })
    .catch(e => alert(JSON.stringify(e)));

}


}

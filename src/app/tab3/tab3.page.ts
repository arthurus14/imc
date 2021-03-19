import { Component } from '@angular/core';

import { Chart } from 'chart.js';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private storage: Storage) {

    this.getStorage();

  }
 
  getStorage(){

    //
    
    
    
        
        this.storage.get('imc').then((val) => {
          console.log('date est page 3 :', val.date);
          console.log('poids est page 3 :', val.poids);
    
       
      //créer table avec date et poids
          this.storage.forEach((key, value, index) => {
            console.log("poids "+key.poids+" Kg date "+key.date+" index: "+" value "+value+" "+index);
          });
        });
    
       
      }

}

import { Component } from '@angular/core';
import {NavController} from '@ionic/angular';
import { Tab2Page } from '../tab2/tab2.page';

import { Router } from '@angular/router';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public navCtrl : NavController, private router : Router) {}

  public imc(age:number,poids:number,taille:number){

    this.router.navigate(['Tab2Page',{
      age : age,
      poids : poids,
      taille : taille

    }]);

   
  }

}

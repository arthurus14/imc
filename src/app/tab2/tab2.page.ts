import { Component } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  

  poids: number;
  age : number;
  taille : number;

  imc : number;
  constructor(private route: ActivatedRoute,private location: Location) {}
  //...
  sub = this.route.params.subscribe(params => {
       this.poids = params['poids'];
       this.age = params['age'];
       this.taille = params['taille'];
       
       
   this.imc = (this.poids/(this.taille * this.taille));  
   
       
  });

  myBackButton(){
    this.location.back();
  }
   

   


}

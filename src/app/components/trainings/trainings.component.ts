import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { TrainingsService } from 'src/app/services/trainings.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  listTrainings : Training[] = [];

  constructor(private cartService : CartService, private router : Router, private trainingsService : TrainingsService) {
   }

  ngOnInit(): void {
    //boucle dans une boucle !
    this.trainingsService.getTrainings().forEach(el => {
      for (let i = 0; i < el.length; i++) {
        this.listTrainings.push(el[i])
      }
    });
  }

  onAddToCart(training:Training){
    if(training.quantity > 0) {
      this.cartService.addTraining(training);
      this.router.navigateByUrl('cart');
    }
  }

  getTrainings(){
    this.trainingsService.getTrainings();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart : Training[] | undefined;
  amount : number = 0;


  constructor(private cartService : CartService , private router : Router) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.amount = this.cartService.getAmount();
  }

  onRemoveFromCart(training : Training){
    this.cartService.removeTraining(training);
    this.cart = this.cartService.getCart();
    this.amount = this.cartService.getAmount();
  }

  onNewOrder(){
    if(!this.cartService.isAuth()) {  //si l'utilisateur n'est pas connecté, renvoyer au formulaire d'authentifcation
      this.router.navigateByUrl('auth');
    } else if(!this.cartService.isCust()){
      this.router.navigateByUrl('customer');
    } else { //sinon, envoyer vers le récap commande
      this.router.navigateByUrl('order');
    }
  }
}

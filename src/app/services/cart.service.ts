import { Injectable } from '@angular/core';
import { Customer } from '../model/customer.model';
import { Training } from '../model/training.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart : Map<number,Training>;
  private qty: number = 0;

  constructor() {     
    // au démarrage du service, je récupère le contenu du local storage : command en cours
    let cart = localStorage.getItem('cart');
    if(cart){  // le panier existe déjà
      this.cart = new Map(JSON.parse(cart));
    } // sinon il faut le créer
    else this.cart = new Map<number,Training>();
  }

  addTraining(training: Training) { 
    if(this.cart.has(training.id)){ //si l'id existe dans le panier je modifie la quantité
      this.qty = Object(this.cart.get(training.id)).quantity
      training.quantity += this.qty;
    }
    this.cart.set(training.id, training)
    this.saveCart(); //à chaque fois que j'ajoute un élément au panier, je met à jour le local storage
  }

  saveCustomer(customer : Customer) {
    localStorage.setItem('customer',JSON.stringify(customer));
  }

  saveCart() {
    localStorage.setItem('cart',JSON.stringify([...this.cart]));
  }

  removeTraining(training: Training) {
    this.cart.delete(training.id);
    this.saveCart();
  }

  getCart() {
    return Array.from(this.cart.values());
  }

  getAmount() : number {
    let amount : number = 0;
    this.cart.forEach(training => {
      amount += training.price * training.quantity;
    });
    return amount;    
  }

  getCustomer() : Customer {
    let customer = localStorage.getItem('customer');
    if(customer)  return  JSON.parse(customer);
    return new Customer("unknown","","","","");
  }

  // getUser() : User {
  //   let customer = localStorage.getItem('customer');
  //   if(customer)  return  JSON.parse(customer);
  //   return new User("","", ["USER"]);
  // }

  clear() {
    this.cart.clear();
    localStorage.removeItem('cart');
  }
}

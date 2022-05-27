import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {  
  myForm : FormGroup
  customer: Customer = new Customer("Inconnu", "", "", "", "");

  btnInscr = false;
  btnUpd = false;

  constructor(public cartService : CartService, private router : Router, private authService : AuthService) { 
    let customer = this.cartService.getCustomer(); 
    this.myForm = new FormGroup ({
      name: new FormControl(customer.name),
      firstName: new FormControl(customer.firstName),
      address: new FormControl(customer.address),
      phone: new FormControl(customer.phone),
      email: new FormControl(customer.email)
    })

    if(localStorage.getItem('customer')) this.btnUpd = true //si un client est enregistré dans le LS, j'affiche le bouton modifier
    else this.btnInscr = true //sinon le bouton s'inscrire
  }

  ngOnInit(): void {
  }

  // onSaveCustomer(customer : Customer){
  //   this.cartService.saveCustomer(customer);
  //   this.router.navigateByUrl('order');
  // }

  onSaveCustomer(form: FormGroup){
    this.cartService.saveCustomer(new Customer(form.value.name, form.value.firstName, form.value.address, form.value.phone, form.value.email));
    if(this.btnUpd) this.routerUpdateCust();
    if(this.btnInscr) this.routerCreateCust();
  }

  routerUpdateCust(){
    if(!localStorage.getItem('user')){
      alert("Vous n'êtes pas connecté, vous allez être renvoyé au formulaire de connexion.")
      this.router.navigateByUrl('auth');
    } else {
      this.router.navigateByUrl('account');
    }
  }

  routerCreateCust(){
    if(!localStorage.getItem('user')){
      alert("Vous n'êtes pas connecté, vous allez être renvoyé au formulaire de connexion.")
      this.router.navigateByUrl('auth');
    } else {
      this.router.navigateByUrl('order');
    }
  }
}

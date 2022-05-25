import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {  
  myForm : FormGroup
  customer: Customer = new Customer("Inconnu", "", "", "", "");

  constructor(public cartService : CartService, private router : Router) { 
    let customer = this.cartService.getCustomer(); 
    this.myForm = new FormGroup ({
      name: new FormControl(customer.name),
      firstName: new FormControl(customer.firstName),
      address: new FormControl(customer.address),
      phone: new FormControl(customer.phone),
      email: new FormControl(customer.email)
    })
  }

  ngOnInit(): void {
  }

  // onSaveCustomer(customer : Customer){
  //   this.cartService.saveCustomer(customer);
  //   this.router.navigateByUrl('order');
  // }

  onSaveCustomer(form: FormGroup){
    this.cartService.saveCustomer(new Customer(form.value.name, form.value.firstName, form.value.address, form.value.phone, form.value.email));

    if(!this.cartService.isAuth()){
      this.router.navigateByUrl('auth');
    } else {
      this.router.navigateByUrl('order');
    }
  }
}

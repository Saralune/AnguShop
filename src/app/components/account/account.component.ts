import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  isAuth : boolean = false;

  constructor(private router: Router, public cartService: CartService) {
   if(localStorage.getItem('user')) this.isAuth = true;
  }

  ngOnInit(): void {

  }

  onUpdate(){
    this.router.navigateByUrl('customer');
  }

  onAuth(){
    this.router.navigateByUrl('auth');
  }

}

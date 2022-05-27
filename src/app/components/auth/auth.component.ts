import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  myAuth : FormGroup
  //customer: Customer = new Customer("Inconnu", "", "", "", "");
  user: User = new User("", "", ['USER'])

  constructor(public authService : AuthService, private router : Router) {  
    //let customer = this.cartService.getCustomer(); 
    this.myAuth = new FormGroup ({
      userName: new FormControl(this.user.userName),
      password: new FormControl(this.user.password),
    })
  }

  ngOnInit(): void {
  }

  onSaveUser(form: FormGroup){
    let testUser = new User(form.value.userName, form.value.password, ['USER']);
    this.authService.saveUser(testUser);  //sauvegarde l'utilisateur dans le LS

    if(this.authService.checkUser(testUser)){ //regarde si l'utilisateur existe dans le fichier cart.service
      if(!this.authService.isCust()){
        this.router.navigateByUrl('customer');
      } else {
        this.router.navigateByUrl('order');
      }
    } else {
      alert('Votre compte n\'existe pas. Merci de réessayer')
    }
  }

  // onCheckUser(form : FormGroup){ ////////si jamais l'utilisateur est déjà connecté, bah on fait autre chose ?
  //   // for (let i = 0; i < this.cartService.getUsers().length; i++) {
  //   //   if(form.value.userName == this.cartService.getUsers()[i].userName) {

  //   //   }
  //   // }
  //   let testUser = new User(form.value.userName, form.value.password, ['USER'])
  //   if(this.cartService.checkUser(testUser)){
      
  //   }
    
  //   this.onSaveUser(form);
  // }

  onInscr(form : FormGroup) {!
    //si customer pas renseigné
    //this.onSaveUser(form);
    this.router.navigateByUrl('customer');
  }

}

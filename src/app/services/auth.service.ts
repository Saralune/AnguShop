import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
//import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    {username: "sarah", password: "123", roles: ['USER']},
    {username: "test", password: "123", roles: ['USER']},
    {username: "titi", password: "123", roles: ['USER']}
  ]

  constructor() { 
  }

  saveUser(user : User){
    if(this.checkUser(user)){
      //user.password = 
      //const salt = bcrypt.genSaltSync(10);
      //let pass = bcrypt.hashSync(user.password, salt);
      localStorage.setItem('user', 'logged');
    }
  }

  getUsers() : Object[]{
    return this.users;
  }

  isAuth(): boolean{
    if(localStorage.getItem('user')){
      return true;
    } else {
      return false;
    }
  }

  isCust() : boolean{
    if(localStorage.getItem('customer')){
      return true;
    } else {
      return false;
    }
  }

  //vérifie si l'utilisateur fait partie des utilisateurs enregistrés dans le tableau users
  checkUser(user: User) : boolean{ 
    for (let i = 0; i < this.users.length; i++) {
      if(this.users[i].username == user.userName  && this.users[i].password == user.password) {
        return true;
      }
    }
    return false;
  }

  deco(){
    localStorage.removeItem('user');
  }

}

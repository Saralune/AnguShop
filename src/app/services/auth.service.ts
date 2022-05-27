import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    {username: "sarah", password: "123", roles: ['USER']},
    {username: "test", password: "123", roles: ['USER']},
    {username: "titi", password: "123", roles: ['USER']}
  ]

  constructor() { }

  saveUser(user : User){
    //////////////////////////////////////////////////
    localStorage.setItem('user', 'logged');
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

  checkUser(user: User) : boolean{ //check si l'utilisateur fait partie des utilisateurs enregistrés dans le tableau users
    for (let i = 0; i < this.users.length; i++) {
      if(this.users[i].username == user.userName  && this.users[i].password == user.password) {
        return true;
      }
    }
    return false;
  }
}

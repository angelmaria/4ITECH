import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { DecodedToken } from './decoded-token.dto';

// ng generate service authentication/authentication (usado ayer para crear el servicio, por consola)
// npm install jwt-decode   (libreria para decodificar token utilizar hoy)
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  // BehaviorSubject permite suscribirse y estar informado cuando el valor cambie
  isLoggedIn = new BehaviorSubject<boolean>(this.existsToken());
  userEmail = new BehaviorSubject<string>(this.getUserEmail());
  isAdmin = new BehaviorSubject<boolean>(this.getIsAdmin());

  constructor() { }

  existsToken(){
    return localStorage.getItem("jwt_token") !== null; // true or false TODO revisar si el token no está expirado
  }
    // Añade el token, guarda
  saveToken (token: string) {
    localStorage.setItem("jwt_token", token);
    this.isLoggedIn.next(true);
    this.userEmail.next(this.getUserEmail());
    this.isAdmin.next(this.getIsAdmin());

  } // para borrar el Logout y borrar el token del usuario.
  removeToken(){
    localStorage.removeItem("jwt_token");
    this.isLoggedIn.next(false);
    this.userEmail.next('');
    this.isAdmin.next(false);

  }
  getUserEmail(){
    const token = localStorage.getItem("jwt_token");
    if(!token) return '';
    const decodedToken = jwtDecode(token) as DecodedToken;
    return decodedToken.email;
    
  }
  getIsAdmin(){  // true si role es admin y false si es cualquier otra cosa
    const token = localStorage.getItem("jwt_token");
    if(!token) return false;
    const decodedToken = jwtDecode(token) as DecodedToken;
    return decodedToken.role === 'ADMIN'; // true or false




  }
}

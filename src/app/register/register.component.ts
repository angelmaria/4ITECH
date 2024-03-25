import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from '../models/register.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   // no necesita el formBuilder
   registerForm = new FormGroup({
    email: new FormControl ('', [Validators.required, Validators.email]), // hacerlo el campo obligatorio y que lleve @ y .com .es o similar
    phone: new FormControl ('', [Validators.required, Validators.pattern('^[0-9]{9}$')]),  // valores de 0 a 9 y que sean 9 números
    password: new FormControl ('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
    passwordConfirm: new FormControl ('')
  },
   {validators: this.passwordConfirmValidator}  // validacion personalizada que comprueba que los dos campos sean iguales
  );

  constructor(private httpClient: HttpClient){}

  passwordConfirmValidator(control: AbstractControl) {

    if (control.get('password')?.value === control.get('passwordConfirm')?.value) {
      return null;  // coinciden valores en ambos campos... pues devolvemos null

    } else {
      //si no coinciden devolvemos un error:
      return {
        'confirmError': true
      }
    }
  }
  save() {
    const register: Register = {
      email: this.registerForm.get('email')?.value ??'',
      phone: this.registerForm.get('phone')?.value ??'',
      password: this.registerForm.get('password')?.value ??''

    }
    console.log(register);

    // Limpiar el formulario una vez enviados los registros al backend o redirigir a pantalla de login
    this.registerForm.reset();  // no hay validacion solo limpia los valores del formulario al dar al boton
    // validaciones:


  }

}



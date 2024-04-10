import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserRole } from '../models/userRole.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{

  userForm = new FormGroup({
    id: new FormControl<number>(0),
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    email: new FormControl<string>(''),
    phone: new FormControl<string>(''),
    userName: new FormControl<string>(''),
    password: new FormControl<string>(''),
    address: new FormControl<string>(''),
    userRole: new FormControl<UserRole>(UserRole.USER)
  });

  isUpdate: boolean = false; // por defecto estoy en CREAR, no en ACTUALIZAR.
  // userRoles: UserRole[] = []; // array de userRoles para asociar al usuario.

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;

      this.httpClient.get<User>('http://localhost:8080/users/' + id)
      .subscribe(userFromBackend => {
        // cargar el usuario obtenido en el formulario userForm.
        this.userForm.reset(userFromBackend);
        // marcar boolean isUpdate true
        this.isUpdate = true;
      });
    });
  }

  save(){
    const user: User = this.userForm.value as User;
    console.log(user); //para visualizar cómo el objeto user se envía al backend.

    if (this.isUpdate) { // establezco la url de update:
      const url = 'http://localhost:8080/users/' + user.id;
      this.httpClient.put<User>(url, user).subscribe(userFromBackend => {
        this.router.navigate(['/users']);
      });
    } else { // establezco la url de create:
      const url = 'http://localhost:8080/users';
      this.httpClient.post<User>(url, user).subscribe(userFromBackend => {
        this.router.navigate(['/users']);
      });
    }
  }


}

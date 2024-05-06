import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserRole } from '../models/userRole.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../models/user.model';
import { LoginComponent } from '../login/login.component';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { of } from 'rxjs';
import { Token } from '../authentication/token.dto';
import { AuthenticationService } from '../authentication/authentication.service';

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
    userRole: new FormControl<UserRole>(UserRole.USER),
    photoUrl: new FormControl<string>('')
  });

  isUpdate: boolean = false; // por defecto estoy en CREAR, no en ACTUALIZAR.
  // userRoles: UserRole[] = []; // array de userRoles para asociar al usuario.
  photoFile: File | undefined;
  photoPreview: string | undefined;
  user: User | undefined;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
    ) {}

  ngOnInit(): void {
    console.log("eeeeee1");

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

  onFileChange(event: Event) {
    console.log(event);
    let target = event.target as HTMLInputElement;

    if(target.files === null || target.files.length == 0) {
      return; // no se procesa ningún archivo
    }

    this.photoFile = target.files[0]; // guardar el archivo para enviarlo luego en el save()

  // previsualizar la imagen por pantalla
  let reader = new FileReader();
  reader.onload = event => this.photoPreview = reader.result as string;
  reader.readAsDataURL(this.photoFile);
  }

  save(){
    
    let formData = this.createFormData();

    // Crear un nuevo objeto con solo email y password
    let loginData = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    const url = 'http://localhost:8080/users/login';
    this.httpClient.post<Token>(url, loginData).subscribe({
      next: response => {
        console.log(response.token)
        this.authService.saveToken(response.token);
      },
      error: error => console.error('Subscription error:', error)
    })

    if(this.isUpdate){
      this.httpClient.put<User>('http://localhost:8080/users/' + this.user?.id, formData)
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          return of(error);
        })
      )
      .subscribe({
        next: user => this.navigateToList(),
        error: error => console.error('Subscription error:', error)
      });
    } else {
      this.httpClient.post<User>('http://localhost:8080/users', formData)
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          return of(error);
        })
      )
      .subscribe({
        next: user => this.navigateToList(),
        error: error => console.error('Subscription error:', error)
      });
    }
  }

  createFormData() {
    let formData = new FormData();
    formData.append('id', this.userForm.get('id')?.value?.toString() ?? '0');
    formData.append('firstName', this.userForm.get('firstName')?.value ?? '');
    formData.append('lastName', this.userForm.get('lastName')?.value ?? '');
    formData.append('email', this.userForm.get('email')?.value ?? '');
    formData.append('phone', this.userForm.get('phone')?.value ?? '');
    formData.append('userName', this.userForm.get('userName')?.value ?? '');
    formData.append('password', this.userForm.get('password')?.value ?? '');
    formData.append('address', this.userForm.get('address')?.value ?? '');
    formData.append('userRole', this.userForm.get('userRole')?.value ?? '');
    formData.append('photoUrl', this.userForm.get('photoUrl')?.value ?? '');
  
    if(this.photoFile){
      formData.append("photo", this.photoFile);
    }
  
    return formData;
  }
  
  navigateToList() {
    this.router.navigate(['/users']);
  }
  }


import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit{

  user: User | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id']; //extraigo el 'id' de la url.
      if (!id) return;
      const backendUrl = 'http://localhost:8080/users/' + id; //llamo al controlador:
      this.httpClient.get<User>(backendUrl).subscribe(userFromBackend => {
        this.user = userFromBackend;
        console.log(this.user);
      });
    });
  }

}

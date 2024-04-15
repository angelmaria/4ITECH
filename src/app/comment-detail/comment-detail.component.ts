import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommentModel } from '../models/commentmodel.model';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../authentication/authentication.service';


@Component({
  selector: 'app-comment-detail',
  standalone: true,
  imports: [RouterLink, NgbRatingModule, DatePipe],
  templateUrl: './comment-detail.component.html',
  styleUrl: './comment-detail.component.css'
})
export class CommentDetailComponent implements OnInit{

  comment: CommentModel | undefined;
  rating = 0;
  isAdmin = false;
  isLoggedIn = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
     this.authService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];

      if (!id) return;

      const backendUrl = 'http://localhost:8080/comments/' + id;
      this.http.get<CommentModel>(backendUrl).subscribe(commentBackend => {
        this.comment = commentBackend;
        
        // console.log(this.comment);
      });
    });
   
  }
  
}


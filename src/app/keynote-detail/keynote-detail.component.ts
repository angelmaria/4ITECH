import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Keynote } from '../models/keynote.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommentModel } from '../models/commentmodel.model';
import { NgbAlertModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../authentication/authentication.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-keynote-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, NgbAlertModule, NgbRatingModule, ReactiveFormsModule],
  templateUrl: './keynote-detail.component.html',
  styleUrl: './keynote-detail.component.css'
})
export class KeynoteDetailComponent implements OnInit {

  keynote: Keynote | undefined;
  comments: CommentModel[] = [];
  isAdmin = false;
  isLoggedIn = false;
  userId = 0;
  showSuccessDeletedComment = false;
  showErrorDeletedComment = false;
  showForm = false;
  dateTime = new Date();
  //comments: CommentModel | undefined;

  commentForm = new FormGroup({
    rating: new FormControl<number>(0),
    opinion: new FormControl<string>(''),
    dateTime: new FormControl<Date>(new Date()),
  });
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) {
    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
    this.authService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.authService.userId.subscribe(userId => this.userId = userId);
  }

  ngOnInit(): void {

    //this.loadComments();
    // extraer el id de la url
    // traer el keynote de backend utilizando petición HTTP GET
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;

      const url = 'http://localhost:8080/keynotes/' + id;
      this.httpClient.get<Keynote>(url).subscribe(keynoteBackend => {
        this.keynote = keynoteBackend;
        //console.log(this.keynote);
        this.loadComments();
      });

      const backendUrl = 'http://localhost:8080/comments/filter-by-keynote/' + id;
      this.httpClient.get<CommentModel[]>(backendUrl).subscribe(commentBackend => {
        this.comments = commentBackend;
        
        // console.log(this.comment);
      });
    });

  }

  save() {
    console.log('saving');
    
    const comment: CommentModel = {
      id: 0,
      rating: this.commentForm.get('rating')?.value?? 0,
      opinion: this.commentForm.get('opinion')?.value ?? '',
      dateTime: this.commentForm.get('dateTime')?.value ?? new Date(),
      keynote: this.keynote
    };
     
      let fechaActual = new Date();
      fechaActual.setHours(fechaActual.getHours() + 2);
      comment.dateTime = fechaActual;
    

    this.httpClient.post<CommentModel>('http://localhost:8080/comments', comment).subscribe(comment => {
        this.commentForm.reset();
        this.loadComments();
        this.showForm = false;
    });

  }

   loadComments() {
    if (!this.keynote) return;

    this.httpClient.get<CommentModel[]>('http://localhost:8080/comments/filter-by-keynote/' + this.keynote?.id)
        .subscribe(commentsBackend => this.comments = commentsBackend);
  }
    deleteComment(comment: CommentModel) {
      this.httpClient.delete('http://localhost:8080/comments/' + comment.id)
      .subscribe({
        next: response => {
          this.loadComments();
          this.showSuccessDeletedComment = true;
        },
        error: error => {
          this.showErrorDeletedComment = true;
        }
      });
    }

  // private loadComments() {
  //   const backenUrl = 'http://localhost:8080/comments';
  //   this.httpClient.get<CommentModel[]>(backenUrl).subscribe(commentsBackend => {
  //     this.comments = commentsBackend;
  //   });

  //     // a mayores, se podría llamar a otros controladores y traer más datos

  //     // traer todos los capítulos de un libro
  //     // /chapters/filter-by-book/id

  //     // traer todos los comments de un libro
  //     // /comments/filter-by-book/id 

  //     // traer todas las categorías de un libro
  //     // /categories/filter-by-book/id

  //     // traer el autor del libro
  //     // /author/fiter-by-book/id
  // }
}
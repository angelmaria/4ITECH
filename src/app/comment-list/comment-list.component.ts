import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommentModel } from '../models/commentmodel.model';
import { NgbAlertModule, NgbCarouselModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../authentication/authentication.service';
import { Keynote } from '../models/keynote.model';
import { ShortTextPipe } from "../short-text.pipe";


@Component({
    selector: 'app-comment-list',
    standalone: true,
    templateUrl: './comment-list.component.html',
    styleUrl: './comment-list.component.css',
    imports: [RouterLink, NgbAlertModule, DatePipe, NgbRatingModule, NgbCarouselModule, ShortTextPipe]
})
export class CommentListComponent implements OnInit {

  comments: CommentModel[] = [];
  showDeletedCommentMessage: boolean = false;
  keynote: Keynote | undefined;
  user: any;
  keynotes: Keynote[] = [];

  isAdmin = false;
  isLoggedIn = false;

  constructor(private http: HttpClient,
              private authService:AuthenticationService
  ) {this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
    this.authService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);

  }
    
  ngOnInit(): void {
    this.loadsKeynotes();

    this.loadComments();

  }
  delete(comment: CommentModel) {
    const url = 'http://localhost:8080/comments/' + comment.id;
    this.http.delete(url).subscribe(Response => {
      this.loadComments();
      this.showDeletedCommentMessage = true;
    });
  }
  hideDeletedCommentMessage() {
    this.showDeletedCommentMessage = false;
  }
  
  private loadComments() {
    const backenUrl = 'http://localhost:8080/comments';
    this.http.get<CommentModel[]>(backenUrl).subscribe(commentsBackend => {
      this.comments = commentsBackend;
    });
  }
  private loadsKeynotes() {
  
    const url = 'http://localhost:8080/keynotes';
    this.http.get<Keynote[]>(url).subscribe(keynotes => this.keynotes = keynotes);
  }
  private loadsKeynoteProjections() {
    
    const url = 'http://localhost:8080/keynotes/projections/home';
    this.http.get<Keynote[]>(url).subscribe(keynotes => this.keynotes = keynotes);
  }
}

    
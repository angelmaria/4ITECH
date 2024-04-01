import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommentModel } from '../models/commentmodel.model';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule, NgbAlertModule],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit {

  comments: CommentModel[] = [];
  showDeletedCommentMessage: boolean = false;
  keynote: any;
user: any;

  constructor(private http: HttpClient) {}
    
  ngOnInit(): void {

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
}

    







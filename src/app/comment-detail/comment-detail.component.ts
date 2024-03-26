import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommentModel } from '../models/commentmodel.model';


@Component({
  selector: 'app-comment-detail',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './comment-detail.component.html',
  styleUrl: './comment-detail.component.css'
})
export class CommentDetailComponent implements OnInit{

  comment: CommentModel | undefined;


  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

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


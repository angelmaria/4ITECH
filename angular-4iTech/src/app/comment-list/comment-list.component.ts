import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Comment } from '@angular/compiler';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit {

  comments: Comment[] = [];

  constructor(private http: HttpClient) {}
    
  ngOnInit(): void {

        // traer una lista de comments del backend: crea y ejecuta una petición HTTP contra un controlador Backend
    const backenUrl = 'http://localhost:8080/comments';
    this.http.get<Comment[]>(backenUrl).subscribe(commentsBackend => {
      // guardamos la respuesta del backend en una variable para poder usarla
      this.comments = commentsBackend;
    });

  }

}

    







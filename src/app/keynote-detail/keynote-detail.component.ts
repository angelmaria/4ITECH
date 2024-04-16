import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Keynote } from '../models/keynote.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommentModel } from '../models/commentmodel.model';
import { NgbAlertModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-keynote-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, NgbAlertModule, NgbRatingModule],
  templateUrl: './keynote-detail.component.html',
  styleUrl: './keynote-detail.component.css'
})
export class KeynoteDetailComponent implements OnInit {

  keynote: Keynote | undefined;
  comments: CommentModel[] = [];
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {

    this.loadComments();
    // extraer el id de la url
    // traer el keynote de backend utilizando petición HTTP GET
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;

      const url = 'http://localhost:8080/keynotes/' + id;
      this.httpClient.get<Keynote>(url).subscribe(keynoteBackend => {
        this.keynote = keynoteBackend;
        console.log(this.keynote);
      });

      // a mayores, se podría llamar a otros controladores y traer más datos

      // traer todos los capítulos de un libro
      // /chapters/filter-by-book/id

      // traer todos los comments de un libro
      // /comments/filter-by-book/id 

      // traer todas las categorías de un libro
      // /categories/filter-by-book/id

      // traer el autor del libro
      // /author/fiter-by-book/id

    });

  }
  private loadComments() {
    const backenUrl = 'http://localhost:8080/comments';
    this.httpClient.get<CommentModel[]>(backenUrl).subscribe(commentsBackend => {
      this.comments = commentsBackend;
    });
  }
}

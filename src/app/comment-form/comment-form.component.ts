import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Keynote } from '../models/keynote.model';
import { CommentModel } from '../models/commentmodel.model';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, NgbRatingModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})


export class CommentFormComponent implements OnInit {

  commentForm = new FormGroup({
    id: new FormControl<number>(0),
    rating: new FormControl<number>(0),
    opinion: new FormControl<string>(''),
    user: new FormControl(),
    keynote: new FormControl()

  });

  isUpdate: boolean = false;
  users: User[] = [];
  keynotes: Keynote[] = [];
  comments: any;
  rating: any;
  
  

  constructor(private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.httpClient.get<User[]>('http://localhost:8080/users')
      .subscribe(users => this.users = users);

    this.httpClient.get<Keynote[]>('http://localhost:8080/keynotes')
      .subscribe(keynotes => this.keynotes = keynotes);

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;

      this.httpClient.get<CommentModel>('http://localhost:8080/comments/' + id)
        .subscribe(commentFromBackend => {
          // cargar el comentario obtenido en el formulario commentForm
          this.commentForm.reset({
            id: commentFromBackend.id,
            rating: commentFromBackend.rating,
            opinion: commentFromBackend.opinion,
            user: commentFromBackend.user, // carga un user en el selector
            keynote: commentFromBackend.keynote
          });

          this.isUpdate = true;

        });
    });
  }
  save() {
    const comment: CommentModel = this.commentForm.value as CommentModel;
      console.log(comment);

      if (this.isUpdate) {
        const url = 'http://localhost:8080/comments/' + comment.id;
        this.httpClient.put<CommentModel>(url, comment).subscribe(commentFromBackend => {
          this.router.navigate(['/comments', commentFromBackend.id, 'detail']);
        });

      } else {
        const url = 'http://localhost:8080/comments';
        this.httpClient.post<CommentModel>(url, comment).subscribe(commentFromBackend => {
          this.router.navigate(['/comments', commentFromBackend.id, 'detail']);
        });
      }
  }
  compareObjects(o1: any, o2: any): boolean {
    // console.log("Comparando objetos: ", o1, o2);

    if(o1 && o2) {
      return o1.id === o2.id;
    }
    return o1 === o2;
  }
}

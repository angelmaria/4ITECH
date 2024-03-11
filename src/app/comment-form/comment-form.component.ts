import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent {

  commentForm = this.fb.group({
    id: [0],
    rating: [0.0],
    opinion: [''],
    //user: [],
    //keynote: [[]]
  });

  constructor (private fb: FormBuilder, private httpCliente: HttpClient) {}

  save() {
    // Extraer los valores de cada input escritos por el usuario
    console.log("Guardando comment");
    const id = this.commentForm.get('id')?.value ?? 0;
    const rating = this.commentForm.get('rating')?.value ?? 0.0;
    const opinion = this.commentForm.get('opinion')?.value ?? 'opinion por defecto';
    const user = this.commentForm.get('user')?.value ?? 'user1';
    const keynote = this.commentForm.get('keynote')?.value ?? [];

    // Crear el objeto utilizando los valores extraídos
    /*
    const commentToSave: Comment = {
      id: id,
      rating: rating,
      opinion: opinion,
      user: user,
      keynote: keynote
    }
    */
    //console.log(commentToSave);
    // Enviar el objeto a backend utilizando HttpCliente
    const url = 'http://localhost:8080/comments';
    //this.httpCliente.post<Comment>(url, commentToSave).subscribe (comment => console.log(comment));
  }

}

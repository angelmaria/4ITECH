import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Keynote } from '../models/keynote.model';

@Component({
  selector: 'app-keynote-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './keynote-form.component.html',
  styleUrl: './keynote-form.component.css'
})
export class KeynoteFormComponent {
  keynoteForm = this.fb.group({
    id: [0],
    title: [''], 
    summary: [''],
    description: [''], 
    webinarUrl: [''],
    // one to one
    room: [''],
    maxNumPersons: [0],

    // enumerated
    // level: DifficultyLevel;
    durationInMin: [0],
    // many to one
    // speaker: UserRole; 
    // manyToOne
    // tracks: Date;

    // ManyToMany
    // attendees: UserRole[]; 
  });

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  save() {
    console.log("Guardando keynote");

    // Extraer los valores de cada input escritos por el usuario
    const id = this.keynoteForm.get('id')?.value ?? 0;
    const title = this.keynoteForm.get('title')?.value ?? 'titulo por defecto';
    const summary = this.keynoteForm.get('summary')?.value ?? 'summary por defecto';
    const description = this.keynoteForm.get('description')?.value ?? 'description por defecto';
    const webinarUrl = this.keynoteForm.get('webinarUrl')?.value ?? 'webinarUrl por defecto';
    const room = this.keynoteForm.get('room')?.value ?? 'room por defecto';
    const maxNumPersons = this.keynoteForm.get('maxNumPersons')?.value ?? 0;
    const durationInMin = this.keynoteForm.get('durationInMin')?.value ?? 0;

    // Crear un objeto utilizando los valores extraídos
    // const keynoteToSave: Keynote = {
    //   id: id,
    //   title: title,
    //   summary: summary,
    //   description: description,
    //   webinarUrl: webinarUrl,
    //   room: room,
    //   maxNumPersons: maxNumPersons,
    //   durationInMin: durationInMin
    // }
    // console.log(keynoteToSave);


    // Enviar el objeto a backend utilizando HttpClient
    // const url = 'http://localhost:8080/keynotes';
    // this.httpClient.post<Keynote>(url, keynoteToSave).subscribe(keynote => console.log(keynote));

  }
}

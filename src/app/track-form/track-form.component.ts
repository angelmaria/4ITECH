import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Track } from '../models/track.model';

@Component({
  selector: 'app-track-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './track-form.component.html',
  styleUrl: './track-form.component.css'
})
export class TrackFormComponent {
  trackForm = this.fb.group({
    id: [0],
    name: [''],
    startDate: [new Date()],
    endDate: [new Date()]
  });

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  save(){
    console.log('Guardando track');
     // Extraer los valores de cada input escritos por el usuario
     const id =  this.trackForm.get('id')?.value ?? 0;
     const name = this.trackForm.get('name')?.value ?? 'nombre por defecto';
     const startDate= this.trackForm.get('startDate')?.value ?? new Date();
     const endDate= this.trackForm.get('endDate')?.value ?? new Date();

     // Crear un objeto utilizando los valores extraídos
     const trackToSave: Track = {
       id: id,
       name: name,
       startDate: startDate,
       endDate: endDate
     }
     console.log(trackToSave);
         // Enviar el objeto a backend utilizando HttpClient
    const url = 'http://localhost:8080/tracks';
    this.http.post<Track>(url, trackToSave).subscribe(track => console.log(track));

    this.trackForm.reset();


  }
}
  


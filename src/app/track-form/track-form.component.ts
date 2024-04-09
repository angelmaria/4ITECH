import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Track } from '../models/track.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-track-form',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './track-form.component.html',
  styleUrl: './track-form.component.css'
})
export class TrackFormComponent {

  trackForm = new FormGroup({
    id: new FormControl<number>(0),
    name: new FormControl<string>(''),
    startDate: new FormControl<Date>(new Date()),
    endDate: new FormControl<Date>(new Date())
  });

  isUpdate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}
     

  ngOnInit(): void {


    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;

      this.httpClient.get<Track>('http://localhost:8080/tracks/' + id)
        .subscribe(trackFromBackend => {
          // Cargar el track obtenido en el formulario trackForm, previo reset y vuelva al formulario para editar
          this.trackForm.reset(trackFromBackend);
          // marcar boolean true isUpdate
          this.isUpdate = true;

        });
    });
  }
    
    save () {
      const track: Track = this.trackForm.value as Track;

      if (this.isUpdate) {
        const url = 'http://localhost:8080/tracks/' + track.id;
        this.httpClient.put<Track>(url, track).subscribe(trackFromBackend => {
          this.router.navigate(['/tracks', trackFromBackend.id, 'detail']);

        });

      } else {
        const url = 'http://localhost:8080/tracks';
        this.httpClient.post<Track>(url, track).subscribe(trackFromBackend => {
          this.router.navigate(['/tracks', trackFromBackend.id, 'detail']);

        });
      }
    }
  }


    
      

    


  







function save() {
  throw new Error('Function not implemented.');
}


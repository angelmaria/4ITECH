import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Keynote } from '../models/keynote.model';
import { DifficultyLevel } from '../models/difficultyLevel.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../models/room.model';

@Component({
  selector: 'app-keynote-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './keynote-form.component.html',
  styleUrl: './keynote-form.component.css'
})
export class KeynoteFormComponent implements OnInit {

  keynoteForm = new FormGroup({
    id: new FormControl<number>(0),
    title: new FormControl<String>(''),
    summary: new FormControl<String>(''),
    description: new FormControl<String>(''),
    webinarUrl: new FormControl<String>(''),
    room: new FormControl(),
    maxNumPersons: new FormControl<number>(0),
    difficultyLevel: new FormControl<DifficultyLevel>(DifficultyLevel.JUNIOR),
    durationInMin: new FormControl<number>(0)
  })

  isUpdate: boolean = false; // por defecto estamos en CREAR no en ACTUALIZAR
  rooms: Room[] = []; // array de rooms para asociar una keynote a una sala

  constructor(private fb: FormBuilder, 
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      
    }

    ngOnInit(): void {
      // cargar rooms de backend para el selector de rooms en el formulario
      this.httpClient.get<Room[]>('http://localhost:8080/rooms').subscribe(rooms => this.rooms = rooms);
  
      this.activatedRoute.params.subscribe(params => {
        const id = params['id'];
        if(!id) return;
  
        this.httpClient.get<Keynote>('http://localhost:8080/keynotes/' + id)
        .subscribe(keynoteFromBackend => {
          // cargar el keynote obtenido en el formulario keynoteForm
          this.keynoteForm.reset({
            id: keynoteFromBackend.id,
            title: keynoteFromBackend.title,
            summary: keynoteFromBackend.summary,
            description: keynoteFromBackend.description,
            webinarUrl: keynoteFromBackend.webinarUrl,
            room: keynoteFromBackend.room,
            maxNumPersons: keynoteFromBackend.maxNumPersons,
            difficultyLevel: keynoteFromBackend.difficultyLevel,
            durationInMin: keynoteFromBackend.durationInMin
          });
  
          // marcar boolean true isUpdate
          this.isUpdate = true;
        });
      });
    }
  
      save(){
        const keynote: Keynote = this.keynoteForm.value as Keynote;
  
        if (this.isUpdate) {
          const url ='http://localhost:8080/keynotes/' + keynote.id;
          this.httpClient.put<Keynote>(url, keynote).subscribe(keynoteFromBackend => {
            this.router.navigate(['/keynotes', keynoteFromBackend.id, 'detail']);
          });
        } else {
          const url ='http://localhost:8080/keynotes';
          this.httpClient.post<Keynote>(url, keynote).subscribe(keynoteFromBackend => {
            this.router.navigate(['/keynotes', keynoteFromBackend.id, 'detail']);
        });
      }
    }
  
    compareObjects(o1: any, o2: any): boolean {
      // console.log("comparando objetos", o1, o2)
      if(o1 && o2) {
        return o1.id === o2.id;
      }
  
      return o1 === o2;
    }
  }


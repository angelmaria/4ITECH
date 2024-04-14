import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Keynote } from '../models/keynote.model';
import { DifficultyLevel } from '../models/difficultyLevel.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Room } from '../models/room.model';
import { User } from '../models/user.model';
import { Track } from '../models/track.model';


@Component({
  selector: 'app-keynote-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './keynote-form.component.html',
  styleUrl: './keynote-form.component.css'
})
export class KeynoteFormComponent implements OnInit {

  keynoteForm = new FormGroup({
    id: new FormControl<number>(0),
    title: new FormControl(''),
    summary: new FormControl(''),
    description: new FormControl(''),
    photoUrl : new FormControl(''),
    webinarUrl: new FormControl(''),
    room: new FormControl(),
    maxNumPersons: new FormControl(0),
    difficultyLevel: new FormControl(DifficultyLevel.JUNIOR),
    durationInMin: new FormControl(0),
    speaker: new FormControl(),
    track: new FormControl(),
    attendees: new FormControl()
  })

  isUpdate: boolean = false; // por defecto estamos en CREAR no en ACTUALIZAR
  rooms: Room[] = []; // array de rooms para asociar una keynote a una sala
  speakers: User[] = []; // array de speakers para asociar una keynote a un ponente
  attendees: User[] = []; // array de antendees para asociar un usuario a una keynote
  tracks: Track[] = []; // array de tracks para asociar una keynote a un track
  photoFile: File | undefined;
  photoPreview: string | undefined;
  keynote: Keynote | undefined;

  constructor(
    // private fb: FormBuilder, 
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

    ngOnInit(): void {
      // cargar rooms, speakers, atendeeds y tracks de backend para el selector correspondiente en el formulario
      this.httpClient.get<Room[]>('http://localhost:8080/rooms').subscribe(rooms => this.rooms = rooms);
      this.httpClient.get<User[]>('http://localhost:8080/users').subscribe(speakers => this.speakers = speakers);
      this.httpClient.get<User[]>('http://localhost:8080/users').subscribe(attendees => this.attendees = attendees);
      this.httpClient.get<Track[]>('http://localhost:8080/tracks').subscribe(tracks => this.tracks = tracks);


      this.activatedRoute.params.subscribe(params => {
        const id = params['id'];
        if(!id) return;
  
        this.httpClient.get<Keynote>('http://localhost:8080/keynotes/' + id)
        .subscribe(keynoteFromBackend => {
          // cargar el keynote obtenido en el formulario keynoteForm
          this.keynoteForm.reset(keynoteFromBackend);
      
          // marcar boolean true isUpdate
          this.isUpdate = true;
          this.keynote = keynoteFromBackend; // es necesario??
        });
      });
    }

    onFileChange(event: Event) {
      console.log(event);
      let target = event.target as HTMLInputElement;

      if(target.files === null || target.files.length == 0) {
        return; // no se procesa ningún archivo
      }

      this.photoFile = target.files[0]; // guardar el archivo para enviarlo luego en el save()

    // OPCIONAL: PREVISUALIZAR LA IMAGEN POR PANTALLA
    let reader = new FileReader();
    reader.onload = event => this.photoPreview = reader.result as string;
    reader.readAsDataURL(this.photoFile);
    }
  
      save(){

        let formData = new FormData();

        if(this.photoFile) {
          formData.append("photo", this.photoFile);
        }

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
      

      // let formData = new FormData();
      // formData.append('id', this.keynoteForm.get('id')?.value?.toString() ?? '0');
      // formData.append('title', this.keynoteForm.get('title')?.value ?? '');
      // formData.append('summary', this.keynoteForm.get('summary')?.value ?? '');
      // formData.append('description', this.keynoteForm.get('description')?.value ?? '');
      // formData.append('photoUrl', this.keynoteForm.get('photoUrl')?.value ?? '');
      // formData.append('room', this.keynoteForm.get('room')?.value ?? '');
      // formData.append('maxNumPersons', this.keynoteForm.get('maxNumPersons')?.value?.toString() ?? '0');
      // formData.append('difficultyLevel', this.keynoteForm.get('difficultyLevel')?.value ?? '');
      // formData.append('durationInMin', this.keynoteForm.get('durationInMin')?.value?.toString() ?? '0');
  
      // if(this.photoFile) {
      //   formData.append("photo", this.photoFile);
      // }
  
      // if (this.isUpdate) {
      //     this.httpClient.put<Keynote>('http://localhost:8080/keynotes/' + this.keynote?.id, formData)
      //   .subscribe(author => this.navigateToList());
      // } else {
      //   this.httpClient.post<Keynote>('http://localhost:8080/keynotes', formData)
      //   .subscribe(author => this.navigateToList());
      // }
      
    }
    private navigateToList() {
      this.router.navigate(['/keynotes']);
  
   }
  
    compareObjects(o1: any, o2: any): boolean {
      // console.log("comparando objetos", o1, o2)
      if(o1 && o2) {
        return o1.id === o2.id;
      }
  
      return o1 === o2;
    }
  }


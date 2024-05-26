import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Room } from '../models/room.model';

@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.css'
})
export class RoomFormComponent implements OnInit{
  
  roomForm = new FormGroup({
    id: new FormControl<number>(0),
    name: new FormControl<string>(''),
    capacity: new FormControl<number>(0),
    hasSockets: new FormControl<boolean>(false),
    photoUrl: new FormControl<string>('')
  });
   
  photoFile: File | undefined;
  photoPreview: string | undefined;
  room: Room | undefined;
  isUpdate: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;

      this.httpClient.get<Room>('http://localhost:8080/rooms/' + id)
      .subscribe(room => {
        this.roomForm.reset(room);
        this.isUpdate = true;
        this.room = room;
      });
    });
  }
  onFileChange(event: Event) {
    //console.log(event);
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
    //const room: Room = this.roomForm.value as Room;
    //console.log(this.room);
    let formData = new FormData();

    formData.append('id', this.roomForm.get('id')?.value?.toString() ?? '0');
    formData.append('name', this.roomForm.get('name')?.value ?? '');
    formData.append('capacity', this.roomForm.get('capacity')?.value?.toString() ?? '0');
    formData.append('hasSockets', this.roomForm.get('hasSockets')?.value?.toString() ?? 'false');
    formData.append('photoUrl', this.roomForm.get('photoUrl')?.value ?? '');

    if(this.photoFile) {
      formData.append("photo", this.photoFile);
    }



    if (this.isUpdate) {
      this.httpClient.put<Room>('http://localhost:8080/rooms/' + this.room?.id, formData)
    .subscribe(room => this.navigateToList());
  } else {
    this.httpClient.post<Room>('http://localhost:8080/rooms', formData)
    .subscribe(room => this.navigateToList());
  }
}
  private navigateToList() {
    this.router.navigate(['/rooms']);
  }
}

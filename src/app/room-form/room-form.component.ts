import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  
  isUpdate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;

      this.httpClient.get<Room>('http://localhost:8080/rooms/' + id)
      .subscribe(roomFromBackend => {
        this.roomForm.reset(roomFromBackend);
        this.isUpdate = true;
      });
    });
  }

  save(){
    const room: Room = this.roomForm.value as Room;
    console.log(room);

    if (this.isUpdate){
      const url = 'http://localhost:8080/rooms/' + room.id;
      this.httpClient.put<Room>(url, room).subscribe(roomFromBackend => {
        this.router.navigate(['/rooms']);
      });
    } else {
      const url = 'http://localhost:8080/rooms';
      this.httpClient.post<Room>(url, room).subscribe(roomFromBackend => {
        this.router.navigate(['/rooms']);
      });
    }
  }

}

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Ticket } from '../models/ticket.model';



@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.css'
})
export class TicketFormComponent {
ticketForm = this.fb.group ({
  id: [0],
  title:[''],
  username:[''],
  price:[0,0],
  maxNum:[0],

});
  http: any;

constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  save() {
    console.log("Guardando ticket");

    const id = this.ticketForm .get('id')?.value ?? 0;
    const title = this.ticketForm .get('title')?.value ?? 'titulo por defecto';
    const username = this.ticketForm .get('username')?.value ?? 'username por defecto';
    const price = this.ticketForm .get('price')?.value ?? 0.0;
    const maxNum = this.ticketForm .get('maxNum')?.value ?? 0;
    
    const ticketToSave: Ticket = {
      id: id,
      title: title,
      username: username,
      price: price,
      maxNum: maxNum,
    }
    console.log(ticketToSave);
  
     const url = 'http://localhost:8080/tickets';
    // this.http.post(url, ticketToSave).subscribe(ticket => console.log(ticket));
    
    
  }
    
}

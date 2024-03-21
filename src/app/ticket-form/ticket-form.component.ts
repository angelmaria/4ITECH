import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Ticket } from '../models/ticket.model';
import { ActivatedRoute, Router } from '@angular/router';



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
  price:[0,0],
  maxNum:[0],


});

  isUpdate: boolean=false ;
  //user: User[] = [];

constructor(private fb: FormBuilder,
  private httpClient: HttpClient,
  private router: Router,
  private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void{
    //
    this.activatedRoute.params.subscribe(params =>{
      const id = params['id'];
      if(!id)return;

    this.httpClient.get<Ticket>('http://localhost:8080/tickets/'+ id)
    .subscribe(ticketFromBackend =>{
      //cargar el libro en el formulario ticketbook
      this.ticketForm.reset({
        id: ticketFromBackend.id,
        title: ticketFromBackend.title,
        price: ticketFromBackend.price,
        maxNum: ticketFromBackend.maxNum

      });

      this.isUpdate = true;

      });
    });

  }

  save() {

    const ticket:Ticket =this.ticketForm.value as Ticket;
    if (this.isUpdate){
        const url= 'http://localhost:8080/tickets' + ticket.id;
        this.httpClient.put<Ticket>(url,ticket).subscribe(ticketFromBackend =>{
          this.router.navigate(['/tickets', ticketFromBackend.id, 'detail']);

      });
    }else {
      const url= 'http://localhost:8080/tickets';
      this.httpClient.post<Ticket>(url,ticket).subscribe(ticketFromBackend =>{
        this.router.navigate(['/tickets', ticketFromBackend.id, 'detail']);

      });
    }
  }
}
    

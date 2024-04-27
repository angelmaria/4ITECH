import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [RouterLink,NgbAlert,FormsModule],
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  ticket: Ticket | undefined;
  showCreateTicketMessage: boolean = false;
  showUpdateTicketMessage: boolean = false;
  ticketForm: FormGroup;
  isUpdate: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.ticketForm = this.formBuilder.group({
     
    });
}

 
    ngOnInit(): void {
   
   
        this.activatedRoute.params.subscribe(params => {
          const id = params['id'];
          if (!id) return;
          const backendUrl = 'http://localhost:8080/tickets/' + id;
          this.http.get<Ticket>(backendUrl).subscribe(t => this.ticket = t);
        });
      }
    
      save() {
        const ticket: Ticket = this.ticketForm.value as Ticket;
        if (this.isUpdate) {
          const url = 'http://localhost:8080/tickets/' + ticket.id;
          this.http.put<Ticket>(url, ticket).subscribe(ticketFromBackend => {
            this.router.navigate(['/tickets', ticketFromBackend.id, 'detail']);
            this.showUpdateTicketMessage = true;
            setTimeout(() => {
              this.showUpdateTicketMessage = true;
            }, 5000); // Ocultar mensaje después de 5 segundos
          });
        } else {
          const url = 'http://localhost:8080/tickets';
          this.http.post<Ticket>(url, ticket).subscribe(ticketFromBackend => {
            this.router.navigate(['/tickets', ticketFromBackend.id, 'detail']);
            this.showCreateTicketMessage = true;
            setTimeout(() => {
              this.showCreateTicketMessage = true;
            }, 5000); // Ocultar mensaje después de 5 segundos
    });
    }
}
}
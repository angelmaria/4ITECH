import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ticket } from '../models/ticket.model';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule,NgbAlertModule],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent implements OnInit {
handleTableClick() {
throw new Error('Method not implemented.');
}
  tickets: Ticket[] = [];
  showDeletedTicketMessage: boolean = false;

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.loadTickets();
  }

  delete(ticket: Ticket) {
    const backendUrl = 'http://localhost:8080/tickets/' + ticket.id;
    this.http.delete(backendUrl).subscribe(response => {this.loadTickets()
    this.showDeletedTicketMessage = true;
    
  });
  }

hideDeletedTicketMessage() {
      this.showDeletedTicketMessage = false;
    }

    private loadTickets() {
    const url = 'http://localhost:8080/tickets';
    this.http.get<Ticket[]>(url).subscribe(tickets => this.tickets = tickets);
  }
}


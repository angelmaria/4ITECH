import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ticket } from '../models/ticket.model';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // traer una lista de tracks del backend: crea y ejecuta una petición HTTP contra un controlador Backend
    const backenUrl = 'http://localhost:8080/tickets';
    this.http.get<Ticket[]>(backenUrl).subscribe(tickets => {
      console.log(tickets);
      // guardamos la respuesta del backend en una variable para poder usarla
      this.tickets = tickets;
    });
  }
}

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css'
})
export class TicketDetailComponent implements OnInit {
  ticket: Ticket | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // extraer el id de la url
    // traer el keynote de backend utilizando petición HTTP GET
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;
      const backendUrl = 'http://localhost:8080/tickets/' + id;
      console.log(backendUrl)
      this.http.get<Ticket>(backendUrl).subscribe(ticketBackend => {
        this.ticket = ticketBackend;
        console.log(this.ticket);
      });

    });

  }
}

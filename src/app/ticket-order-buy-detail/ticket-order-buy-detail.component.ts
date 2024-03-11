import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TicketOrderBuy } from '../models/ticketOrderBuy.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-order-buy-detail',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './ticket-order-buy-detail.component.html',
  styleUrl: './ticket-order-buy-detail.component.css'
})
export class TicketOrderBuyDetailComponent implements OnInit {

  ticketOrderBuy: TicketOrderBuy | undefined;

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
      const backendUrl = 'http://localhost:8080/ticketOrderBuys/' + id;
      this.http.get<TicketOrderBuy>(backendUrl).subscribe(ticketOrderBuyBackend => {
        this.ticketOrderBuy = ticketOrderBuyBackend;
        console.log(this.ticketOrderBuy);
      });

    });

  }
}

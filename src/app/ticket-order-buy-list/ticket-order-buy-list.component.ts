import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TicketOrderBuy } from '../models/ticketOrderBuy.model';

@Component({
  selector: 'app-ticket-order-buy-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './ticket-order-buy-list.component.html',
  styleUrl: './ticket-order-buy-list.component.css'
})
export class TicketOrderBuyListComponent implements OnInit {
  ticketOrderBuys: TicketOrderBuy[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // traer una lista de tracks del backend: crea y ejecuta una petición HTTP contra un controlador Backend
    const backenUrl = 'http://localhost:8080/ticketOrderBuys';
    this.http.get<TicketOrderBuy[]>(backenUrl).subscribe(ticketOrderBuys => {
      console.log(ticketOrderBuys);
      // guardamos la respuesta del backend en una variable para poder usarla
      this.ticketOrderBuys = ticketOrderBuys;
    });
  }
}

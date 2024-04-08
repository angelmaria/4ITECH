import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TicketOrderBuy } from '../models/ticketOrderBuy.model';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticket-order-buy-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule,NgbAlertModule],
  templateUrl: './ticket-order-buy-list.component.html',
  styleUrl: './ticket-order-buy-list.component.css'
})

export class TicketOrderBuyListComponent implements OnInit {
  ticketOrderBuys: TicketOrderBuy[] = [];
  showDeletedTicketOrderBuyMessage: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTicketOrderBuys();
  }
  
  deleteTicketOrderBuy(ticketOrderBuy: TicketOrderBuy) {
    const backendUrl = 'http://localhost:8080/ticketOrderBuys/' + ticketOrderBuy.id;
    this.http.delete(backendUrl).subscribe(response => {
      this.loadTicketOrderBuys();
      this.showDeletedTicketOrderBuyMessage = true;
    });
  }

  hideDeletedTicketOrderBuyMessage() {
    this.showDeletedTicketOrderBuyMessage = false;
  }

  private loadTicketOrderBuys() {
    const url = 'http://localhost:8080/ticketOrderBuys';
    this.http.get<TicketOrderBuy[]>(url).subscribe(ticketOrderBuys => this.ticketOrderBuys = ticketOrderBuys);
  }
}


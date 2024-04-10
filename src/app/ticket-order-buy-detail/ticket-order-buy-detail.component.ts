import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TicketOrderBuy } from '../models/ticketOrderBuy.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-order-buy-detail',
  standalone: true,
  imports: [RouterLink,NgbAlert,DatePipe],
  templateUrl: './ticket-order-buy-detail.component.html',
  styleUrl: './ticket-order-buy-detail.component.css'
})
export class TicketOrderBuyDetailComponent implements OnInit {

  ticketOrderBuy: TicketOrderBuy | undefined;
  showCreateTicketOrderBuyMessage: boolean = true;
  showUpdateTicketOrderBuyMessage: boolean = false;
  ticketOrderBuyForm!: FormGroup;
  isUpdate: boolean = false;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  private formBuilder: FormBuilder
  ) {
    this.ticketOrderBuyForm = this.formBuilder.group({
     
    });
  }

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


  save() {
    const ticketOrderBuy: TicketOrderBuy = this.ticketOrderBuyForm.value as TicketOrderBuy;
    if (this.isUpdate) {
      const url = 'http://localhost:8080/tickets/' + ticketOrderBuy.id;
      this.http.put<TicketOrderBuy>(url, ticketOrderBuy).subscribe(ticketOrderBuyFromBackend => {
        this.router.navigate(['/ticketOrderBuys', ticketOrderBuyFromBackend.id]);
        this.showUpdateTicketOrderBuyMessage = true;
        setTimeout(() => {
          this.showUpdateTicketOrderBuyMessage = false;
        }, 5000); // Ocultar mensaje después de 5 segundos
      });
    } else {
      const url = 'http://localhost:8080/ticketOrderBuys';
      this.http.post<TicketOrderBuy>(url, ticketOrderBuy).subscribe(ticketOrderBuyFromBackend => {
        this.router.navigate(['/tickets', ticketOrderBuyFromBackend.id]);
        this.showCreateTicketOrderBuyMessage = true;
        setTimeout(() => {
          this.showCreateTicketOrderBuyMessage = false;
        }, 5000); // Ocultar mensaje después de 5 segundos
      });
    }
  }
  
}



import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../models/ticket.model';
import { TicketOrderBuy } from '../models/ticketOrderBuy.model';

@Component({
  selector: 'app-ticketOrderBuy-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './ticket-order-buy-form.component.html',
  styleUrl: './ticket-order-buy-form.component.css'
})


export class TicketOrderBuyFormComponent implements OnInit {
  ticketOrderBuyForm: FormGroup;
  isUpdate: boolean = false;
  showCreateTicketOrderBuyMessage: boolean = false;
  showUpdateTicketOrderBuyMessage: boolean = false;
  hideDeletedTicketOrderBuyMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.ticketOrderBuyForm = this.fb.group({
      id: [],
      date: [new Date()],
      discount: [0],
      totalPrice: [0],
      quantity: [0],
      paymentMethod: [''],
      channel: [''],
      qrUrl: [''],
      ticket: this.fb.group({}) // objeto
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (!id) return;

      this.httpClient
        .get<TicketOrderBuy>('http://localhost:8080/ticketOrderBuys/' + id)
        .subscribe((ticketOrderBuyFromBackend) => {
          this.ticketOrderBuyForm.patchValue(ticketOrderBuyFromBackend);
          this.isUpdate = true;
        });
    });
  }

  save() {
    const ticketOrderBuy: TicketOrderBuy = this.ticketOrderBuyForm.value as TicketOrderBuy;
    const url = this.isUpdate
      ? 'http://localhost:8080/ticketOrderBuys/' + ticketOrderBuy.id
      : 'http://localhost:8080/ticketOrderBuys';

    const httpMethod = this.isUpdate ? 'put' : 'post';

    this.httpClient[httpMethod](url, ticketOrderBuy).subscribe( // Eliminar <TicketOrderBuy>
      (ticketOrderBuyFromBackend) => {
        const messageId = this.isUpdate ? 'update' : 'create';
        this.router.navigate(['/ticketOrderBuys', 'ticketOrderBuyFromBackend.id', 'detail'], { // Cambiar 'ticketOrderBuyFromBackend.Id' a 'ticketOrderBuyFromBackend.id'
          queryParams: { [messageId]: true }
        });
        this.showCreateTicketOrderBuyMessage = true;
      },
      (error) => {
        console.error('An error occurred while saving the ticket order buy:', error);
      }
    );
  }

  hideCreateTicketOrderBuyMessage() {
    this.showCreateTicketOrderBuyMessage = false;
  }

  delete(ticketOrderBuy: TicketOrderBuy) {
    const backendUrl = 'http://localhost:8080/ticketOrderBuys/' + ticketOrderBuy.id;
    this.httpClient.delete(backendUrl).subscribe(response => {
        this.loadTicketOrderBuys();
        this.hideDeletedTicketOrderBuyMessage = false;
    });
}

  loadTicketOrderBuys() {
    throw new Error('Method not implemented.');
  }

}
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TicketOrderBuy } from '../models/ticketOrderBuy.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticketOrderBuy-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './ticket-order-buy-form.component.html',
  styleUrl: './ticket-order-buy-form.component.css'
})
export class TicketOrderBuyFormComponent {
  ticketOrderBuyForm = this.fb.group({
    id: [0],
    date: [new Date()],
    discount: [0],
    totalPrice: [0],
    quantity: [0],
    paymentMethod: [''],
    channel: [''],
    qrUrl: [''],
    ticket: this.fb.group({}) // objeto
    //User: [0],
  });
isUpdate: boolean = false;
users: any;
tickets: any;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit(): void {
    // ...
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (!id) return;
      this.httpClient.get<TicketOrderBuy>('http://localhost:8080/ticketOrderBuys/' + id)
        .subscribe(ticketOrderBuyFromBackend => {
          // estos puntos para reducir el texto
          this.ticketOrderBuyForm.reset({

              id: ticketOrderBuyFromBackend.id,
              date: ticketOrderBuyFromBackend.date || new Date(),
              discount: ticketOrderBuyFromBackend.discount || 0,
              totalPrice: ticketOrderBuyFromBackend.totalPrice || 0,
              quantity: ticketOrderBuyFromBackend.quantity || 0,
              paymentMethod: ticketOrderBuyFromBackend.paymentMethod || '',
              channel: ticketOrderBuyFromBackend.channel || '',
              qrUrl: ticketOrderBuyFromBackend.qrUrl || '',
              ticket: ticketOrderBuyFromBackend.ticket || {}
            });
            
            this.isUpdate = true;
          
          });
          
        });
    
  }
  save() {
    const ticketOrderBuy: TicketOrderBuy = this.ticketOrderBuyForm.value as TicketOrderBuy;
    if (this.isUpdate) {
      const url = 'http://localhost:8080/ticketOrderBuys/' + ticketOrderBuy.id;
      this.httpClient.put<TicketOrderBuy>(url, ticketOrderBuy).subscribe(ticketOrderBuyFromBackend=> {
        this.router.navigate(['/ticketOrderBuys', ticketOrderBuyFromBackend.id, 'detail']);
      });
    } else {
      const url = 'http://localhost:8080/ticketOrderBuys';
      this.httpClient.post<TicketOrderBuy>(url, ticketOrderBuy).subscribe(ticketOrderBuyFromBackend => {
        this.router.navigate(['/ticketOrderBuys', ticketOrderBuyFromBackend.id, 'detail']);
      });
    }
  }
}
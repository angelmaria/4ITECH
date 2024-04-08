import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TicketOrderBuy } from '../models/ticketOrderBuy.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../models/ticket.model';

@Component({
  selector: 'app-ticketOrderBuy-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './ticket-order-buy-form.component.html',
  styleUrl: './ticket-order-buy-form.component.css'
})
export class TicketOrderBuyFormComponent {
  ticketOrderBuyForm = this.fb.group({
    
    id: [],
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
tickets: Ticket | undefined;

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

              id: ticketOrderBuyFromBackend.id!,
              date: ticketOrderBuyFromBackend.date || new Date(),
              discount: ticketOrderBuyFromBackend.discount || 0,
              totalPrice: ticketOrderBuyFromBackend.totalPrice || 0,
              quantity: ticketOrderBuyFromBackend.quantity || 0,
              paymentMethod: ticketOrderBuyFromBackend.paymentMethod || '',
              channel: ticketOrderBuyFromBackend.channel || '',
              qrUrl: ticketOrderBuyFromBackend.qrUrl || '',
              //ticket: ticketOrderBuyFromBackend.ticket || {}
            });
            
            this.isUpdate = true;
          
          });
          
        });
    
  }

  save() {
    const ticketOrderBuy: TicketOrderBuy = {
      id: this.ticketOrderBuyForm.value.id!,
      date: this.ticketOrderBuyForm.value.date!,
      discount: this.ticketOrderBuyForm.value.discount!,
      totalPrice: this.ticketOrderBuyForm.value.totalPrice!,
      quantity: this.ticketOrderBuyForm.value.quantity!,
      paymentMethod: this.ticketOrderBuyForm.value.paymentMethod!,
      channel: this.ticketOrderBuyForm.value.channel!,
      qrUrl: this.ticketOrderBuyForm.value.qrUrl!,
     // ticket: this.ticketOrderBuyForm.value.ticket!
    };
  
    
    const url = this.isUpdate ? 'http://localhost:8080/ticketOrderBuys/' + ticketOrderBuy.id : 'http://localhost:8080/ticketOrderBuys';
  
    const request = this.isUpdate ? this.httpClient.put<TicketOrderBuy>(url, ticketOrderBuy) : this.httpClient.post<TicketOrderBuy>(url, ticketOrderBuy);
  
    request.subscribe(
      ticketOrderBuyFromBackend => {
        this.router.navigate(['/ticketOrderBuys', ticketOrderBuyFromBackend.id, 'detail']);
      },
      error => {
        console.error('Error:', error);
      }
    );
    
  }

}

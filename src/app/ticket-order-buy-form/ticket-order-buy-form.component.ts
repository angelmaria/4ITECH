import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TicketOrderBuy } from '../models/ticketOrderBuy.model';

@Component({
  selector: 'app-ticket-order-buy-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './ticket-order-buy-form.component.html',
  styleUrl: './ticket-order-buy-form.component.css'
})
export class TicketOrderBuyFormComponent {


  ticketOrderBuyForm = this.fb.group ({
    id: [0],
    date:[new Date()],
    discount:[0],
    totalPrice:[0,0],
    quantity:[0],
    paymentMethod:[''],
    channel:[''],
    qrUrl:[''],
  
  });
  http: any;
  
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}
  
    save() {
      console.log("Guardando ticketOrderBuy");
  
      const id = this.ticketOrderBuyForm .get('id')?.value ?? 0;
      const date = this.ticketOrderBuyForm .get('Date')?.value ?? new Date();
      const discount = this.ticketOrderBuyForm .get('discount')?.value ?? 0.0;
      const totalPrice = this.ticketOrderBuyForm .get('totalPrice')?.value ?? 0.0;
      const quantity = this.ticketOrderBuyForm .get('quantity')?.value ?? 0;
      const paymentMethod = this.ticketOrderBuyForm .get('paymentMethod')?.value ?? 'Metodo de pago por defecto';
      const channel = this.ticketOrderBuyForm .get('channel')?.value ?? 'canal de compra por defecto';
      const qrUrl = this.ticketOrderBuyForm .get('qrUrl')?.value ?? 'qrUrl por defecto';
      
      const ticketOrderBuyToSave: TicketOrderBuy = {
        id: id,
        date: date,
        discount: discount,
        totalPrice: totalPrice,
        quantity: quantity,
        paymentMethod: paymentMethod,
        channel: channel,
        qrUrl: qrUrl,
        //user: undefined,
        //ticket: undefined
      }
      console.log(ticketOrderBuyToSave);
      const url = 'http://localhost:8080/ticketOrderBuy';
      this.http.post(url, ticketOrderBuyToSave).subscribe((ticketOrderBuy: TicketOrderBuy) => console.log(ticketOrderBuy));
      



    }
    
      
  }
  

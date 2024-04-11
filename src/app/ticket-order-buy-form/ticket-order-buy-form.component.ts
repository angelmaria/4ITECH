import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TicketOrderBuy } from '../models/ticketOrderBuy.model';
import { Ticket } from '../models/ticket.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/user.model';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-ticketOrderBuy-form',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, NgbAlertModule, RouterLink, FormsModule,CommonModule],
  templateUrl: './ticket-order-buy-form.component.html',
  styleUrl: './ticket-order-buy-form.component.css'
})


export class TicketOrderBuyFormComponent implements OnInit {
  ticket: Ticket | undefined;
  user: User | undefined;
  ticketOrderBuy: TicketOrderBuy | undefined;
  
  ticketOrderBuyForm = new FormGroup({
    startDate: new FormControl(new Date()),
    finishDate: new FormControl(new Date()),
    isPremiumShip: new FormControl<boolean>(false),
    extraService: new FormControl<string>('0')
  });
  

totalPrice = 0;
ticketPrice= 0;
Quantity= 0;
extraPrice= 0;
numDays = 0;
shipPrice= 0;
showFinishMessage: boolean | undefined;
  
  constructor(
  
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        return; // si no hay id entonces no llamamos al backend
      }
      // traer el ticket
      this.httpClient.get<Ticket>('http://localhost:8080/tickets/' + id)
        .subscribe(ticket => this.ticket = ticket);
    });
  }

  calculatePrice() {

    // Descuento del 20% para estudiantes Adecco
    if (this.ticketOrderBuyForm.get('isAdeccoStudent')?.value) {
      this.totalPrice -= this.totalPrice * 0.2;
    }

    // 1. Obtener fecha inicio y fecha fin
    let startDate = this.ticketOrderBuyForm.get('startDate')?.value;
    let finishDate = this.ticketOrderBuyForm.get('finishDate')?.value;

    if (!startDate || !finishDate || !this.ticket || !this.ticket.price) {
      return; // si no hay fechas o tickets no calculamos nada, nos vamos
    }

    // 2. Calcular la diferencia de días entre fechas.
    startDate = new Date(startDate);
    finishDate = new Date(finishDate);

    const diffMilliseconds = finishDate.getTime() - startDate.getTime();
    if (diffMilliseconds <= 0) {
      this.ticketPrice = 0;
      this.numDays = 0;
      this.totalPrice = 0;
      return; // fechas incorrectas
    }

    const numDays = Math.round(diffMilliseconds / (1000 * 60 * 60 * 24));
    if (numDays <= 0) {
      this.ticketPrice = 0;
      this.numDays = 0;
      this.totalPrice = 0;
      return;
    }

    // 3. Calcular precio de compra con base al número de días
    this.totalPrice = numDays * this.ticket.price;
    this.totalPrice = this.ticketPrice;

    // 4. Gastos de envío
    if (this.ticketOrderBuyForm.get('isPremiumShip')?.value) {
      this.totalPrice += 50;
    this.totalPrice += this.shipPrice;
  } else {
    this.shipPrice = 0;
  }
    
    // 5. Gastos de servicios extra / pack extra
    const extra = this.ticketOrderBuyForm.get('extraService')?.value || 0;
    console.log(extra);
    console.log(typeof extra); //string
    console.log(typeof Number(extra)); // number
    this.extraPrice = Number(extra);
    this.totalPrice += this.extraPrice;
  }

  save() {
    const startDate = this.ticketOrderBuyForm.get('startDate')?.value;
    const finishDate = this.ticketOrderBuyForm.get('finishDate')?.value;
    if (!startDate || !finishDate || !this.ticket) {
      return; // si faltan fechas o ticket no se guarda
    }

    const ticketOrderBuy: TicketOrderBuy = {
      id: 0, 
      startDate,
      finishDate,
      discount: 0.2, 
      totalPrice: this.totalPrice,
      quantity: 0, 
      paymentMethod: '',
      channel: '',
      qrUrl: '',
      //user: this.user,
      ticket: this.ticket
    };

    // enviar a backend con httpclient post
    this.httpClient.post<TicketOrderBuy>('http://localhost:8080/ticketOrderBuys', ticketOrderBuy)
      .subscribe(ticketOrderBuy => {
        this.ticketOrderBuy = ticketOrderBuy;
        this.showFinishMessage = true;
        // Hacer lo que necesites después de guardar
      });
  }
}

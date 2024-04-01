import { Ticket } from "./ticket.model";

export interface TicketOrderBuy {
   id:null ;
    date: Date;
    discount: number;
    totalPrice: number;
    quantity: number;
    paymentMethod: string;
    channel: string;
    qrUrl: string;

    //ManyToOne
   // user: User; // crear clase

    //ManyToOne
   // ticket: Ticket; // crear clase
}
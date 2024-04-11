import { Ticket } from "./ticket.model";
import { User } from "./user.model";

export interface TicketOrderBuy {
   id:number;
   startDate: Date;
   finishDate:Date;
   discount: number;
   totalPrice: number;
   quantity: number;
   paymentMethod: string;
   channel: string;
   qrUrl: string;

    //ManyToOne
   //user: User; // crear clase

    //ManyToOne
   ticket: Ticket; // crear clase
}
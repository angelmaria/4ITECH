export interface Ticket {
    id: number;
    title: string;
    username: string;
    price: number; // posible cambio a Double, que lo incluye number
    maxNum: number;
}
import mongoose, { connect, Schema, model, Types, Model } from "mongoose";


// The main documents for the database.
interface IAirline {
    airlineId: string;
    airlineName: string;
    password: string;
    token: string;
}

interface ITicket {
    ticketId: string;
    airlineOperator: IAirline;
    quantity: number;
    fromAirport: string;
    toAirport: string;
}

interface ICustomer {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    token: string;
    boughtTickets: Types.DocumentArray<ITicket>;
}

// The schemas

const ticketsSchema = new Schema<ITicket>({
    airlineOperator: { type: String, required: true },
    fromAirport: { type: String, required: true },
    toAirport: { type: String, required: true },
    quantity: { type: Number, required: true },
    ticketId: { type: String, required: true },
})

const customerSchema = new Schema<ICustomer>({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    boughtTickets: { type: [ticketsSchema], required: true }
});

const airlineSchema = new Schema<IAirline>({
    airlineId: { type: String, required: true, unique: true },
    airlineName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
});

// Models
export const Customer = model<ICustomer>('Customers', customerSchema);
export const Ticket = model<ITicket>('Tickets', ticketsSchema);
export const Airline = model<IAirline>('Airlines', airlineSchema);

export async function startDB(): Promise<void> {
    await connect('mongodb://localhost:27017/airlinesDB');
}

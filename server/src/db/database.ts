import mongoose, { connect, Schema, model, Types, Model } from "mongoose";


// The main documents for the database.
export interface IAirline {
    airlineUsername: string;
    airlineName: string;
    password: string;
    token: string;
}

export interface ITicket {
    airlineOperator: IAirline;
    quantity: number;
    fromAirport: string;
    toAirport: string;
}

export interface ICustomer {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    token: string;
    boughtTickets: Types.DocumentArray<ITicket>;
}

// Folds all the refresh tokens of any users.
export interface IRefreshToken {
    token: string;
}

// The schemas

const refreshTokenSchema = new Schema<IRefreshToken>({
    token: { type: String, required: true, unique: true}
});

const ticketsSchema = new Schema<ITicket>({
    airlineOperator: { type: String, required: true },
    fromAirport: { type: String, required: true },
    toAirport: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const customerSchema = new Schema<ICustomer>({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: false, },
    boughtTickets: { type: [ticketsSchema], required: true }
});

const airlineSchema = new Schema<IAirline>({
    airlineName: { type: String, required: true, unique: true },
    airlineUsername: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    token: { type: String, required: false },
});

// Models
export const Customer = model<ICustomer>('Customers', customerSchema);
export const Ticket = model<ITicket>('Tickets', ticketsSchema);
export const Airline = model<IAirline>('Airlines', airlineSchema);
export const RefreshToken = model<IRefreshToken>('RefreshTokens', refreshTokenSchema);

export async function startDB(): Promise<void> {
    await connect('mongodb://localhost:27017/airlinesDB');
}

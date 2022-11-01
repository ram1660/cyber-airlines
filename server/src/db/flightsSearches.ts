import { Ticket } from './database';

interface FlightDetails {
    operator: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
}

export async function searchFlights(origin: string, destination: string): Promise<FlightDetails[]> {
    const matchedFlights = await Ticket.find().where('fromAirport').equals(origin).where('toAirport').equals(destination).exec();
    return matchedFlights.map((flight) =>  {
        return {
            operator: flight.airlineOperator.airlineName,
            arrivalTime: flight.arrivalTime,
            departureTime: flight.departureTime,
            destination: flight.toAirport,
            origin: flight.fromAirport
        }
    });
}

import { CreateFlightRequest, ConflictedFlight } from "../routes/airlinesAccountOperationsRoutes";
import { Ticket } from "./database";

export async function postNewFlight(requestedFlightCreation: CreateFlightRequest): Promise<void> {
    await Ticket.create({
        airlineOperator: requestedFlightCreation.operator,
        arrivalTime: requestedFlightCreation.arrivalTime,
        departureDate: requestedFlightCreation.departureDate,
        departureTime: requestedFlightCreation.departureTime,
        fromAirport: requestedFlightCreation.fromAirport,
        quantity: requestedFlightCreation.ticketsQuantity,
        toAirport: requestedFlightCreation.toAirport
    });
}

// Peforms DB call like comparing other flights with the date, time and place to make sure 
// There are no conflicts between them.
// If the return is null then everything is good to go else return the conflicted flight.
export async function isFlightExists(target: CreateFlightRequest): Promise<ConflictedFlight | null> {
    const conflictedFlightDocument = await Ticket.findOne({ fromAirport: target.fromAirport, departureDate: target.departureDate, departureTime: target.departureTime });
    if (conflictedFlightDocument === null) return null;
    const conflictedFlightFinal: ConflictedFlight = {
        departureDate: conflictedFlightDocument.departureDate,
        fromAirport: conflictedFlightDocument.fromAirport,
        departureTIme: conflictedFlightDocument.departureDate,
        operator: conflictedFlightDocument.airlineOperator.airlineName,
        toAirport: conflictedFlightDocument.toAirport
    };
    return conflictedFlightFinal;
}
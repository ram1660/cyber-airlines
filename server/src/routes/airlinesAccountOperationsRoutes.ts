import express, { Request, Response } from "express";
import { authenticateAirlineToken } from "../middleware/auth";
import { isFlightExists, postNewFlight } from "../db/flightCreations";

const airlineAccountRouter = express.Router();

export interface CreateFlightRequest {
    operator: string;
    fromAirport: string;
    toAirport: string;
    departureDate: string;
    departureTime: string;
    arrivalTime: string;
    ticketsQuantity: number;
}


// This interface is used for returning which flight is conflicting with
// another flight and the necessary information about the flight.
export interface ConflictedFlight {
    operator: string;
    fromAirport: string;
    toAirport: string;
    departureDate: string;
    departureTIme: string;
}

// The authentication method might need to be changed because it's only checks whether the client is an airliner or not.
// It's not checking if the user is really him.
airlineAccountRouter.post('/create/flight', authenticateAirlineToken, async (req: Request, res: Response) => {
    const creationRequest = JSON.parse(req.body) as CreateFlightRequest;
    const isAvailable = await isFlightExists(creationRequest);
    if (isAvailable !== null) {
        // Sending to the client the flight that is conflicting.
        res.status(403).json(isAvailable);
    }
    // Creates the new flight.
    await postNewFlight(creationRequest);
    res.json({message: 'OK'});
});

export default airlineAccountRouter
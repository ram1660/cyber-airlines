import express, { Request, Response } from "express";
import * as airports from '../db/airports.json';
import { searchFlights } from "../db/flightsSearches";
/**
 * This file responsible for looking up for available flights from a source airport to a destination airport.
 */
const searchRouter = express.Router();

interface MatchedFlightsResponse {

}

interface AirportObj {
    name: string;
    city: string;
    country: string;
    iata_code: string;
    _geoloc: {
        lat: number;
        lng: number;
    };
    links_count: number;
    objectID: string;
}

searchRouter.get('/search/flights', async (req: Request, res: Response) => {
    const {origin, destination, page} = req.query;
    const availableFlights = await searchFlights(origin?.toString()!, destination?.toString()!, parseInt(page?.toString()!));
    if (origin === undefined || destination === undefined) {
        res.status(400).json({ flights: [] });
        return;
    }
    res.json({flights: availableFlights});
});

searchRouter.get('/search/airports', (req: Request, res: Response) => {
    const inputAirport = req.query['airport']?.toString();
    if (inputAirport === undefined) {
        res.status(400).json({ matchedAirports: [] });
        return;
    }

    const matchedAirports = Object.values(airports).filter((airport, index) => {
        // The try catch is here because of a weird bug with the JSON.
        // The function goes out of boundaries try to access undefined.
        try {
            return airport.name.toLowerCase().startsWith(inputAirport);
        } catch (error) {
        }
    });

    if (matchedAirports.length === 0) {
        res.json({ matchedAirports: [] });
        return;
    }
    res.json({ matchedAirports: matchedAirports });
});

export default searchRouter;

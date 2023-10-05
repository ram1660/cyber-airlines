import { AirlineData } from "../components/Pages/AirlineProfile";
import { FlightDetailsResponse } from "../interfaces/AvailableFlights";
import { AirlineRegisterForm } from "../interfaces/registerForms";
import { communicator } from "./apiCommunicator";
import Response from '../interfaces/response';

export async function getAirlineProfile(airlineName: string): Promise<AirlineData> {
    const response = await (await communicator.get('/public/airline/profile?name=' + airlineName)).data;
    return response;
}

export async function registerAirline(form: AirlineRegisterForm): Promise<Response> {
    const response = await communicator.post('/register/airline', form);
    return { code: response.status, message: await response.data };
}

export async function findFlights(originAirport: string, destinationAirport: string, startDate: string, returnDate: string, page: number): Promise<FlightDetailsResponse> {
    const response = await (await communicator.get('/search/flights?origin=' + originAirport + '&destination=' + destinationAirport + '&page=' + page)).data as FlightDetailsResponse;
    return response;
}



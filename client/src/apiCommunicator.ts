import { AirlineRegisterForm, CustomerRegisterForm } from "./interfaces/registerForms";
import Response from './interfaces/response';
import axios from "axios";
import { SignInForm, ValidateCredentials } from "./interfaces/loginForm";
import { AirlineData } from "./components/Pages/AirlineProfile";
import SearchAirportsResponse from "./interfaces/searchAirportsResponse";
import { FlightDetailsResponse } from "./interfaces/AvailableFlights";

const PORT = '3000';
const communicator = axios.create({
    baseURL: 'http://localhost:' + PORT
});

export async function getAirlineProfile(airlineName: string): Promise<AirlineData> {
    const response = await (await communicator.get('/public/airline/profile?name=' + airlineName)).data;    
    return response;
}

export async function registerCustomer(form: CustomerRegisterForm): Promise<Response> {
    const response = await communicator.post('/register/customer', form);
    return { code: response.status, message: await response.data};
}

export async function registerAirline(form: AirlineRegisterForm): Promise<Response> {
    const response = await communicator.post('/register/airline', form);
    return { code: response.status, message: await response.data};
}

export async function signIn(form: SignInForm): Promise<Response> {
    const response = await communicator.post('/login', form);
    return { code: response.status, message: await response.data};
}

export async function findAirports(searchTerm: string): Promise<SearchAirportsResponse> {
    const response = await (await communicator.get('/search/airports?airport=' + searchTerm)).data as SearchAirportsResponse;
    return response;
}

export async function findFlights(originAirport: string, destinationAirport: string, startDate: string, returnDate: string, page: number): Promise<FlightDetailsResponse> {
    const response = await (await communicator.get('/search/flights?origin=' + originAirport + '&destination=' + destinationAirport + '&page=' + page)).data as FlightDetailsResponse;
    return response;
}

export async function validateToken(userIdentity: ValidateCredentials): Promise<boolean> {
    const isValid: boolean = await (await communicator.post('/api/validate', userIdentity)).data['isValid'];
    return isValid;
}
import { AirlineRegisterForm, CustomerRegisterForm } from "../interfaces/registerForms";
import Response from '../interfaces/response';
import axios from "axios";
import { SignInForm, ValidateCredentials } from "../interfaces/loginForm";
import { AirlineData } from "../components/Pages/AirlineProfile";
import SearchAirportsResponse from "../interfaces/searchAirportsResponse";
import { FlightDetailsResponse } from "../interfaces/AvailableFlights";

const PORT = '3000';
export const communicator = axios.create({
    baseURL: 'http://localhost:' + PORT
});

export async function signIn(form: SignInForm): Promise<Response> {
    const response = await communicator.post('/login', form);
    return { code: response.status, message: await response.data };
}

export async function findAirports(searchTerm: string): Promise<SearchAirportsResponse> {
    const response = await (await communicator.get('/search/airports?airport=' + searchTerm)).data as SearchAirportsResponse;
    return response;
}

export async function validateToken(userIdentity: ValidateCredentials): Promise<boolean> {
    const isValid: boolean = await (await communicator.post('/api/validate', userIdentity)).data['isValid'];
    return isValid;
}

export async function getCustomerProfile(customerUsername: string, jwtToken: string): Promise<Response> {
    const response = await (await communicator.get(`/profile/customer?username=${customerUsername}`,
        { headers: { 'Authorization': 'Bearer ' + jwtToken } })).data as Response;   
    return response;
}

export async function lookForFlights(sourceAirport: string, destinationAirport: string, departureTime: Date): Promise<FlightDetailsResponse> {
    const response = (await communicator.get(`/search/flights?source=${sourceAirport}&destination=${destinationAirport}&departureTime=${departureTime}`));
    return response.data as FlightDetailsResponse;
}

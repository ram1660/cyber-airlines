import { AirlineRegisterForm, CustomerRegisterForm } from "./interfaces/registerForms";
import Response from './interfaces/response';
import axios from "axios";

const PORT = '3000';
const communicator = axios.create({
    baseURL: 'http://localhost:' + PORT
});


export async function registerCustomer(form: CustomerRegisterForm): Promise<Response> {
    const response = await communicator.post('/register', form);
    return { code: response.status, message: await response.data};
}

export async function registerAirline(form: AirlineRegisterForm): Promise<Response> {
    const response = await communicator.post('/register/airline', form);
    return { code: response.status, message: await response.data};
}
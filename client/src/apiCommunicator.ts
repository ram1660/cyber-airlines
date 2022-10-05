import { AirlineRegisterForm, CustomerRegisterForm } from "./interfaces/registerForms";
import axios from "axios";
const comminucator = axios.create({
    url: 'http://localhost:4000',
    
});
export async function registerCustomer(form: CustomerRegisterForm): Promise<void> {
}

export async function registerAirline(form: AirlineRegisterForm): Promise<void> {

    
}
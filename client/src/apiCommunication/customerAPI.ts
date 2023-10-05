import { CustomerRegisterForm } from "../interfaces/registerForms";
import { communicator } from "./apiCommunicator";
import Response from '../interfaces/response';

export async function registerCustomer(form: CustomerRegisterForm): Promise<Response> {
    const response = await communicator.post('/register/customer', form);
    return { code: response.status, message: await response.data };
}
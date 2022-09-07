/**
 * This file is intended for airline and customer login/register queries.
 * Register and login queries, user existence deleting user queries will be here.
 */
import { Customer, Airline } from './database';
import { AirlineRegisterRequest, CustomerRegisterRequest } from '../routes/userControlRoutes';

export async function checkCredentialsExists(email: string): Promise<boolean> {
    return await isAirlineExists(email) === false && await isCustomerExists(email) === false;
}

export async function isAirlineExists(email: string): Promise<boolean> {
    return await Airline.findOne().where('email').equals(email) !== null;
}

export async function isCustomerExists(email: string): Promise<boolean> {
    return await Customer.findOne().where('email').equals(email) !== null;
}

export async function registerAirline(registerObj: AirlineRegisterRequest): Promise<void> {

}

export async function registerCustomer(registerObj: CustomerRegisterRequest): Promise<void> {

}

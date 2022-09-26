/**
 * This file is intended for airline and customer login/register queries.
 * Register and login queries, user existence deleting user queries will be here.
 */
import { Customer, Airline, IAirline, ICustomer } from './database';
import { AirlineRegisterRequest, CustomerRegisterRequest } from '../routes/loginRoutes';

export async function checkCredentialsExists(username: string): Promise<boolean> {
    return await isAirlineExists(username) === false && await isCustomerExists(username) === false;
}

export async function isAirlineExists(username: string): Promise<boolean> {
    return await Airline.findOne().where('email').equals(username).exec() !== null;
}

export async function isCustomerExists(username: string): Promise<boolean> {
    return (await Customer.findOne().where('email').equals(username).exec()) !== null;
}

export async function registerAirline(registerObj: AirlineRegisterRequest): Promise<void> {
    const registeredAirline = new Airline(registerObj);
    await registeredAirline.save();
}

export async function registerCustomer(registerObj: CustomerRegisterRequest): Promise<void> {
    const registeredCustomer = new Customer(registerObj);
    await registeredCustomer.save();
}

export async function getAirline(username: string): Promise<IAirline> {
    return (await Airline.findOne().where('email').equals(username).exec()) as IAirline;
}

export async function getCustomer(username: string): Promise<ICustomer> {
    return (await Customer.findOne().where('email').equals(username).exec()) as ICustomer;
}

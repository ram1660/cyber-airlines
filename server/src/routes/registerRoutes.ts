import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { isAirlineExists, isCustomerExists, registerAirline, registerCustomer } from '../db/authQueries';

export interface CustomerRegisterRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AirlineRegisterRequest {
  username: string;
  password: string;
  airlineName: string;

}

const registerRouter = express.Router();

function isCredentialsEmpty(username: string, password: string): boolean {
  return username === '' || password === '';
}

registerRouter.post('/register/customer', async (req: Request, res: Response) => {
  const customerForm = req.body as CustomerRegisterRequest;
  if (customerForm.firstName === undefined || customerForm.lastName === undefined) {
    return res.status(400).json({
      message: 'Incorrect form.'
    });
  }
  if (await isAirlineExists(customerForm.username) === true || customerForm.firstName === '' || customerForm.lastName === '') {
    return res.status(403).json({
      message: 'There is already a customer with that username.'
    });
  }
  if (isCredentialsEmpty(customerForm.username, customerForm.password) === true) {
    return res.status(400).json({
      message: 'Username and password must be provided.'
    });
  }
  // Insert the form to the database
  const hashedPassword = bcrypt.hashSync(customerForm.password);
  customerForm.password = hashedPassword;
  await registerCustomer(customerForm);
  res.status(200).json({ message: 'Customer successfully registered' });
});

registerRouter.post('/register/airline', async (req: Request, res: Response) => {
  const airlineForm = req.body as AirlineRegisterRequest;
  if (airlineForm.airlineName === undefined) {
    return res.status(400).json({
      message: 'Incorrect form.'
    });
  }
  if (await isAirlineExists(airlineForm.username) === true) {
    return res.status(403).json({
      message: 'There is already an airline with that username.'
    });
  }
  if (isCredentialsEmpty(airlineForm.username, airlineForm.password) === true || airlineForm.airlineName === '') {
    return res.status(400).json({
      message: 'Username and password must be provided.'
    });
  }
  // Insert the form to the database
  const hashedPassword = bcrypt.hashSync(airlineForm.password);
  airlineForm.password = hashedPassword;
  await registerAirline(airlineForm);
  res.status(200).json({ message: 'Airline successfully registered' });
});

export default registerRouter;
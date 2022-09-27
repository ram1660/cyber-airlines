import express, { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { isAirlineExists, isCustomerExists, registerAirline, registerCustomer } from "../db/authQueries";

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

  
  registerRouter.post('/register/customer', async (req: Request, res: Response) => {
    const CustomerForm = req.body as CustomerRegisterRequest;
    try {
      // Checking if the variable contains fields that are related to a customer.
      CustomerForm.firstName;
      CustomerForm.lastName;
    } catch (error) {
      // It's not a customer send an error.
      res.status(400).json({
        message: "Incorrect form."
      });
      return;
    }
    if (await isAirlineExists(CustomerForm.username) === false) {
      res.status(403).json({
        message: "There is already a customer with that username."
      });
      return;
    }
    // Insert the form to the database
    const hashedPassword = bcrypt.hashSync(CustomerForm.password);
    CustomerForm.password = hashedPassword;
    await registerCustomer(CustomerForm);
    res.status(200).json({message: "Customer successfully registered"});
  });
  
  registerRouter.post('/register/airline', async (req: Request, res: Response) => {
    const airlineForm = req.body as AirlineRegisterRequest;
    try {
      // Checking if the variable contains fields that are related to an airline.
      airlineForm.airlineName;
    } catch (error) {
      // It's not an airline send an error.
      res.status(400).json({
        message: "Incorrect form."
      });
      return;
    }
    if (await isCustomerExists(airlineForm.username) === false) {
      res.status(403).json({
        message: "There is already an airline with that username."
      });
      return;
    }
    // Insert the form to the database
    const hashedPassword = bcrypt.hashSync(airlineForm.password);
    airlineForm.password = hashedPassword;
    await registerAirline(airlineForm);
    res.status(200).json({message: "Airline successfully registered"});
  });

  export default registerRouter;
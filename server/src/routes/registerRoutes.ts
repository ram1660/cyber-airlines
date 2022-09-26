import express, { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { isCustomerExists } from "../db/authQueries";

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
    const customerForm = req.body as CustomerRegisterRequest;
    try {
      // Checking if the variable contains fields that are related to a customer.
      customerForm.firstName;
      customerForm.lastName;
    } catch (error) {
      // It's not a customer send an error.
      res.status(400).json({
        message: "Incorrect form."
      });
      return;
    }
    if (await validateCustomerRegisterForm(customerForm) === false) {
      res.status(403).json({
        message: "There is already a customer with that username."
      });
      return;
    }
    // Insert the form to the database
    const hashedPassword = bcrypt.hashSync(customerForm.password);
    
  });
  
  
  // Performs a check on the database to make sure the customer is not already registered.
  async function validateCustomerRegisterForm(customerForm: CustomerRegisterRequest): Promise<boolean> {
    return await isCustomerExists(customerForm.username);
  }
  
  registerRouter.post('/register/airline', (req: Request, res: Response) => {
  });

  export default registerRouter;
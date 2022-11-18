import express, { Request, Response } from "express";
import { addRefreshToken, getAirline, getCustomer, isAirlineExists, isCustomerExists, isRefreshTokenExists, revokeAccess } from '../db/authQueries';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IAirline, ICustomer } from "../db/database";

interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
  loginType: "CUSTOMER" | "AIRLINE"; // Could be "airline" or "customer".
}

interface LoginResponse {
  username: string;
  refreshToken: string;
  accessToken: string;
}

interface LoginTokenPayload {
  username: string;
  password: string;
}

const loginRouter = express.Router();
const EXPIRATION_TIME = '2h';


loginRouter.post('/login', async (req: Request, res: Response) => {
  // Get user request
  const loginRequest = req.body as unknown as LoginRequest;

  // Validate user input
  if (loginRequest.username === '' || loginRequest.password === '') {
    return res.status(400).json({ message: 'Oops! Looks like you are missing credentials.' });
  }
  // Check if it's a customer or an airline and handle the request accordingly.
  if (loginRequest.loginType === 'AIRLINE') {
    if (await isAirlineExists(loginRequest.username) === false) {
      return res.status(401).json({ message: 'Oops! The username or the password are incorrect!' });
    }
    const airline: IAirline = await getAirline(loginRequest.username);
    if (isPasswordMatching(loginRequest.password, airline.password) === false) {
      return res.status(401).json({ message: 'Oops! The username or the password are incorrect!' });
    }
    let airlineTokens: LoginResponse = {
      accessToken: '',
      refreshToken: '',
      username: loginRequest.username,
    };
    if (loginRequest.rememberMe === true) {
      airlineTokens.refreshToken = generateRefreshToken({
        username: loginRequest.username,
        password: loginRequest.password,
      });
    }
    airlineTokens.accessToken = generateAirlineAccessToken({ username: loginRequest.username });
    res.json(airlineTokens);
  } else if (loginRequest.loginType === 'CUSTOMER') {
    if (await isCustomerExists(loginRequest.username) === false) {
      return res.status(401).json({ message: 'Oops! The username or the password are incorrect!' });
    }
    const customer: ICustomer = await getCustomer(loginRequest.username);
    if (isPasswordMatching(loginRequest.password, customer.password) === false) {
      return res.status(401).json({ message: 'Oops! The username or the password are incorrect!' });
    }
    let customerTokens: LoginResponse = {
      accessToken: '',
      refreshToken: '',
      username: ''
    };
    if (loginRequest.rememberMe === true) {
      customerTokens.refreshToken = generateRefreshToken({
        username: loginRequest.username,
        password: loginRequest.password,
      });
      addRefreshToken(customerTokens.refreshToken);
    }
    customerTokens.accessToken = generateCustomerAccessToken({ username: loginRequest.username });
    customerTokens.username = loginRequest.username;
    res.json(customerTokens);
  } else {
    res.status(403).json({ message: 'It seems like you sent a bad request. Please try again.' });
  }
});

loginRouter.delete('/logout', async (req: Request, res: Response) => {
  revokeAccess(req.body.token);
  res.sendStatus(204);
});

loginRouter.post('/refreshToken', async (req: Request, res: Response) => {
  const { username, refreshToken } = req.body;
  if (refreshToken === null) {
    return res.sendStatus(401);
  }
  if (await isRefreshTokenExists(refreshToken) === false) {
    return res.sendStatus(403);
  }
  let decryptedToken;
  try {
    decryptedToken = jwt.verify(refreshToken, process.env['REFRESH_TOKEN_SECRET'] as string);
  } catch (error) {
    return res.sendStatus(403);
  }
  let newAccessToken;
  if (await isCustomerExists(username) === true) {
    newAccessToken = generateCustomerAccessToken({ username: username });
  } else {
    newAccessToken = generateAirlineAccessToken({ username: username });
  }
  res.json({
    accessToken: newAccessToken
  });

});

loginRouter.post('/api/validate', (req, res) => {
  const { token, username, type } = req.body;
  if (type === 'CUSTOMER') {
      jwt.verify(token, process.env['CUSTOMER_TOKEN_SECRET'] as string, (error: jwt.VerifyErrors | null) => {
        error ? res.json({ isValid: false }) : res.json({ isValid: true });
      });

  } else if (type === 'AIRLINE') {
    jwt.verify(token, process.env['AIRLINE_TOKEN_SECRET'] as string, (error: jwt.VerifyErrors | null) => {
      error ? res.json({ isValid: false }) : res.json({ isValid: true });
    });
  }
});

function isPasswordMatching(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}

function generateCustomerAccessToken(user: { username: string }): string {
  return jwt.sign(user, process.env['CUSTOMER_TOKEN_SECRET'] as string, { expiresIn: EXPIRATION_TIME });
}

function generateAirlineAccessToken(user: { username: string }): string {
  return jwt.sign(user, process.env['AIRLINE_TOKEN_SECRET'] as string, { expiresIn: EXPIRATION_TIME });
}


function generateRefreshToken(payload: LoginTokenPayload): string {
  return jwt.sign(payload, process.env['CUSTOMER_TOKEN_SECRET'] as string, { expiresIn: EXPIRATION_TIME });
}

export default loginRouter;

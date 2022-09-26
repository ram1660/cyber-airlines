import express, { Request, Response } from "express";
import { getAirline, isAirlineExists, isCustomerExists } from '../db/authQueries';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const loginRouter = express.Router();
interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
  loginType: string; // Could be "airline" or "customer".
}

loginRouter.post('/login', async (req: Request, res: Response) => {
  try {
    // Get user input
    const loginRequest = req.body as unknown as LoginRequest;

    // Validate user input
    if (loginRequest.username === '' || loginRequest.password === '') {
      res.status(400).send('Oops! Looks like you are missing credentials.');
      return;
    }
    // Validate if user exist in our database
    let user = null;
    if (loginRequest.loginType === 'airline') {
      user = (await isAirlineExists(loginRequest.username) === true) ? await getAirline(loginRequest.username) : null;
    }
    if (user === null) {
      res.status(400).send('It seems like your credentials are incorrect!');
      return;
    }
    if (await bcrypt.compare(loginRequest.password, user.password) === true) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
      return;
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

function handleAirlineLogin(request: LoginRequest): void {

}

function generateAccessToken(user: { username: string, password: string }): string {
  return jwt.sign(user, process.env['ACCESS_TOKEN_SECRET'] as string, { expiresIn: '15m' });
}

export default loginRouter;

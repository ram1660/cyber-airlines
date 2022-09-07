import express, { Router, Request, Response } from "express";
import jwt from 'jsonwebtoken';
const router = express.Router();
interface LoginRequest {
    username: string;
    password: string;
    rememberMe: boolean;
    loginType: string; // Could be "airline" or "customer".
}

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

router.post('/login', async (req: Request, res: Response) => {
    try {
        // Get user input
        const loginRequest = req.body as unknown as LoginRequest;
    
        // Validate user input
        if (!(loginRequest.username && loginRequest.password)) {
          res.status(400).send("Oops! Looks like you are missing credentials.");
        }
        // Validate if user exist in our database
        const user = await .findOne({ loginRequest.username });
    
        if (user && (await bcrypt.compare(password, user.password))) {
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
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
});

export default router;

import express, { Request, Response } from "express";
import { getCustomerProfile, getAirlineProfile } from "../db/profiles";
import { authenticateCustomerToken } from "../middleware/auth";


const profileRouter = express.Router();

profileRouter.get('/public/airline/profile', async (req, res) => {
    const name: string = req.query['name']?.toString()!;
    const airlineProfile = await getAirlineProfile(name);
    res.json(airlineProfile);
});

profileRouter.get('/profile/customer', authenticateCustomerToken, async (req, res) => {
    const username: string = req.body['username'];
    const customerProfile = await getCustomerProfile(username);
    res.json(customerProfile);
});

export default profileRouter;
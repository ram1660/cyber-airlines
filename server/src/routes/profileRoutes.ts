import express from "express";
import { getCustomerProfile, getAirlineProfile } from "../db/profiles";
import { authenticateCustomerToken } from "../middleware/auth";
import Response from "../app";


const profileRouter = express.Router();

profileRouter.get('/public/airline/profile', async (req, res) => {
    const name: string = req.query['name']?.toString()!;
    try {
        const airlineProfile = await getAirlineProfile(name);
        res.json(airlineProfile);   
    } catch (error: any) {
        res.status(404).json({message: error});
    }
});

profileRouter.get('/profile/customer', authenticateCustomerToken, async (req, res) => {
    const username: string = req.query.username as string;  
    const customerProfile = await getCustomerProfile(username);
    const response: Response = {
        code: 200,
        message: customerProfile 
    }
    res.json(response);
});

export default profileRouter;
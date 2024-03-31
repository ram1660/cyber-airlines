import { Customer, Airline, Ticket } from './database';

interface CustomerProfile {
    firstName: string;
    lastName: string;
}

interface AirlineProfile {
    airlineName: string;
    availableFlights: number;
}

export async function getCustomerProfile(customerUsername: string): Promise<CustomerProfile> {
    const customerModel = await Customer.findOne({ 'username': { $eq: customerUsername } });
    const customerProfile: CustomerProfile = {
        firstName: customerModel?.firstName!,
        lastName: customerModel?.lastName!,
    };
    return customerProfile;
}

export async function getAirlineProfile(airlineName: string): Promise<AirlineProfile> {
    if ((await Airline.exists({ airlineName: { $eq: airlineName } })) === null) {
        return {
            airlineName: "Not Found",
            availableFlights: -1
        };
    }
    const airlineTickets = await Ticket.find().where('airlineOperator').equals(airlineName).count().exec();
    const airlineProfile: AirlineProfile = {
        airlineName: airlineName,
        availableFlights: airlineTickets
    };
    return airlineProfile;
}
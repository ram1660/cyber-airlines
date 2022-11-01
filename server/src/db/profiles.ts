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
    const customerModel = await Customer.findOne({ 'username': customerUsername });
    const customerProfile: CustomerProfile = {
        firstName: customerModel?.firstName!,
        lastName: customerModel?.lastName!
    };
    return customerProfile;
}

export async function getAirlineProfile(airlineName: string): Promise<AirlineProfile> {
    if ((await Airline.exists({airlineName: airlineName})) === null) {
        throw new Error('Airline not found');
    }
    const airlineTickets = await Ticket.find().where('airlineOperator').equals(airlineName).count().exec();
    const airlineProfile: AirlineProfile = {
        airlineName: airlineName,
        availableFlights: airlineTickets
    };
    return airlineProfile;
}
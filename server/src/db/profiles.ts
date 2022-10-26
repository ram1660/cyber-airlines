import { Customer, Airline, IAirline, ICustomer, Ticket } from './database';

interface CustomerProfile {
    firstName: string;
    lastName: string;
}

interface AirlineProfile {
    airlineName: string;
    availableFlights: number;
}

export async function getCustomerProfile(customerUsername: string): Promise<CustomerProfile> {
    const customerModel = await Customer.findOne({'username': customerUsername});
    const customerProfile: CustomerProfile = {
        firstName: customerModel?.firstName!,
        lastName: customerModel?.lastName!
    };
    return customerProfile;
}

export async function getAirlineProfile(airlineName: string): Promise<AirlineProfile> {
    const airlineTickets = await Ticket.find().where('airlineOperator').equals(airlineName).count().exec();
    const airlineProfile: AirlineProfile = {
        airlineName: airlineName,
        availableFlights: airlineTickets
    };
    return airlineProfile;
}
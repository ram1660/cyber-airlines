/**
 * Used as a Sign in request for either a customer or an airline.
 */
export interface CustomerRegisterForm {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

/**
 * The respond we get from the server.
 */
export interface AirlineRegisterForm {
    airlineName: string;
    username: string;
    password: string;
}
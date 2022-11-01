interface FlightDetails {
    operator: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
}
export interface FlightDetailsResponse {
    flights: FlightDetails[];
}
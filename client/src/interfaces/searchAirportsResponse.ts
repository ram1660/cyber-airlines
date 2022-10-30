interface AirportObj {
    name: string;
    city: string;
    country: string;
    iata_code: string;
    _geoloc: {
        lat: number;
        lng: number;
    };
    links_count: number;
    objectID: string;
}

export default interface SearchAirportsResponse {
    matchedAirports: AirportObj[];
};
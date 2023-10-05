import { useQuery } from "@tanstack/react-query";
import React from "react";
import useDebounce from "../hooks/useDebounce";
import { findAirports } from "../apiCommunication/apiCommunicator";
import { Autocomplete, TextField } from "@mui/material";

interface SearchBarProps {
    searchId: string;
    searchLabel: string;
    searchAirportInput: string;
    onSearchInput?: (event: React.SyntheticEvent, value: string, reason: string) => void;
}

const INITIAL_SEARCH_MESSAGE = 'Start typing to find an airport!';
const NO_AIRPORTS_FOUND = 'No airports found has been found with this name.';

export default function AirportSearchBar(props: SearchBarProps) {
    const searchDebounce = useDebounce(props.searchAirportInput);
    
    const getAirports = async (term: string) => {
        if (term === '') {
            return [INITIAL_SEARCH_MESSAGE];
        }
        const foundAirports = await findAirports(term);

        return foundAirports.matchedAirports.length === 0 ? [NO_AIRPORTS_FOUND] : foundAirports.matchedAirports.map((matchedAirport) => `${matchedAirport.name}, ${matchedAirport.city} ${matchedAirport.country}`);
    };

    const originSearchQuery = useQuery(['search', searchDebounce], () => getAirports(searchDebounce));
    return (
        <Autocomplete
            onInputChange={props.onSearchInput}
            freeSolo
            getOptionDisabled={(option) => option === INITIAL_SEARCH_MESSAGE || option === NO_AIRPORTS_FOUND}
            options={originSearchQuery.data === undefined ? [INITIAL_SEARCH_MESSAGE] : originSearchQuery.data}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label={props.searchLabel} />}
            id={props.searchId}
            filterOptions={(x) => x} />
    )
}
import { SelectOptions } from "@/types";
import { ICity, ICountry, IState } from "country-state-city";

export const transformCityOptions = (cities: ICity[]): SelectOptions[]  => {
    return cities.map((city) => ({
        value: city.name,
        label: city.name,
        disabled: false
    }))
}

export const transformStateOptions = (states: IState[]): SelectOptions[]  => {
    return states.map((state) => ({
        value: state.name+'-'+state.isoCode,
        label: state.name,
        disabled: false
    }))
}

export const transformCountryOptions = (countries: ICountry[]): SelectOptions[]  => {
    return countries.map((country) => ({
        value: country.name+'-'+country.isoCode,
        label: country.name,
        disabled: false
    }))
}

export const extractIsoCode = (value: string): string => {
    const splitString = value.split('-');
    if(splitString.length > 1){
        return value.split('-')[1]
    }
    return '';
}
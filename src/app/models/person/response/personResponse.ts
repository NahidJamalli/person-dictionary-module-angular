import { BaseModelResponse } from "../../base-model/response/base-model";
import { CityResponse } from "../../city/cityResponse";
import { PhoneNumberResponse } from "../../phone/response/phoneNumberResponse";
import { PersonRelativeResponse } from "./personRelativeResponse";

export interface PersonResponse {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    personalNumber: string;
    birthDate: string;
    photo: string;
    targetUrl: string;
    city: CityResponse;
    phoneNumbers: PhoneNumberResponse[];
    relatedPeople: PersonRelativeResponse[];
}

export interface PersonListResponse {
    peopleData: PersonResponse[];
    totalPeopleCount: number;
}

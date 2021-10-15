import { CityResponse } from "../../city/cityResponse";
import { PhoneNumberResponse } from "../../phone/response/phoneNumberResponse";

export interface PersonRelativeResponse {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    personalNumber: string;
    birthDate: string;
    photo: string;
    city: CityResponse;
    phoneNumbers: PhoneNumberResponse[];
    relativeType: number;
    personId: number;
}

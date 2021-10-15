import { PhoneNumberRequest } from "../../phone/request/phoneNumberRequest";

export interface GetPersonRequest {
    skip: number;
    take: number;
    firstName: string;
    lastName: string;
    personalNumber: string;
}

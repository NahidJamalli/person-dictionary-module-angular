import { Injectable } from '@angular/core';
import { BaseModelResponse } from 'src/app/models/base-model/response/base-model';
import { GetPersonRequest } from 'src/app/models/person/request/personRequest';
import { PersonListResponse, PersonResponse } from 'src/app/models/person/response/personResponse';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends GeneralService {
  getPersonList(routeParams: GetPersonRequest, url: string = "/people"): Promise<BaseModelResponse<PersonListResponse>> {
    url += `?skip=${routeParams.skip}&take=${routeParams.take}&firstName=${routeParams.firstName}&lastName=${routeParams.lastName}&personalNumber=${routeParams.personalNumber}`;
    return this.sendGetRequest(url);
  }

  getPerson(url: string): Promise<BaseModelResponse<PersonResponse>> {
    return this.sendGetRequest(url);
  }

  updatePerson(body: any, url: string = "/people"): Promise<BaseModelResponse<PersonResponse>> {
    return this.sendPutRequest(body, url);
  }

  deletePerson(url: string) {
    return this.sendDeleteRequest(url);
  }

  addPerson(body: any, url: string = "/people"): Promise<BaseModelResponse<PersonResponse>> {
    return this.sendPostRequest(body, url);
  }
}

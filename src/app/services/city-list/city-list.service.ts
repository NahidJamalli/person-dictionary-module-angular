import { Injectable } from '@angular/core';
import { BaseModelResponse } from 'src/app/models/base-model/response/base-model';
import { CityResponse } from 'src/app/models/city/cityResponse';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class CityListService extends GeneralService {
  getCityList(url: string = "/cities"): Promise<BaseModelResponse<CityResponse[]>> {
    return this.sendGetRequest(url);
  }
}

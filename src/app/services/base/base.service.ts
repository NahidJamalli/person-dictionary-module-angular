import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseModelResponse } from 'src/app/models/base-model/response/base-model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  headers: HttpHeaders;
  protected http: HttpClient;
  public API_EndPoint = 'https://person-dictionary.azurewebsites.net/api';

  constructor(https: HttpClient) {
    this.http = https;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    this.headers = headers;
  }

  async post<T>(url: string, request: any): Promise<BaseModelResponse<T>> {
    let response: BaseModelResponse<T> = {} as BaseModelResponse<T>;

    try {
      let tempResponse = await this.http.post<T>(this.API_EndPoint + url, request, { headers: this.headers }).toPromise();

      response.data = tempResponse;
      response.hasError = false;
      response.error = {};

      return response;
    } catch (error) {
      response.hasError = true;
      response.error = error;
      response.data = {} as T;
      console.log("Error while POST", error);
      return response;
    }
  }

  async put<T>(url: string, request: any, headers: any = {}): Promise<BaseModelResponse<T>> {
    let response: BaseModelResponse<T> = {} as BaseModelResponse<T>;

    try {
      let tempResponse = await this.http.put<T>(this.API_EndPoint + url, request, { headers: headers ?? this.headers }).toPromise();

      response.hasError = false;
      response.data = tempResponse;
      response.error = {};

      return response;
    } catch (error) {
      response.hasError = true;
      response.error = error;
      response.data = {} as T;
      console.error("Error while PUT:", error);
      return response;
    }
  }

  async delete<T>(url: string): Promise<BaseModelResponse<T>> {
    let response: BaseModelResponse<T> = {} as BaseModelResponse<T>;

    try {
      let tempResponse = await this.http.delete<T>(this.API_EndPoint + url, { headers: this.headers }).toPromise();

      response.data = tempResponse;
      response.hasError = false;
      response.error = {};

      return response;
    } catch (error) {
      response.hasError = true;
      response.error = error;
      response.data = {} as T;
      console.log("Error while DELETE", error);
      return response;
    }
  }

  async get<T>(url: string): Promise<BaseModelResponse<T>> {
    let response: BaseModelResponse<T> = {} as BaseModelResponse<T>;

    try {
      let tempResponse = await this.http.get<T>(this.API_EndPoint + url, { headers: this.headers }).toPromise();

      response.data = tempResponse || {} as T;
      response.hasError = false;
      response.error = {};

      return response;
    } catch (error) {
      response.hasError = true;
      response.error = error;
      response.data = {} as T;
      console.log("Error while GET", error);
      return response;
    }
  }
}

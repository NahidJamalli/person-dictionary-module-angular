import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  validationResponse: any = {};
  constructor() { }

  getValidationClass(name: string): string {
    if (this.validationResponse[name]) {
      return "is-invalid";
    }

    return "";
  }

  getValidationMessage(name: string): string {
    if (this.validationResponse[name]) {
      return this.validationResponse[name].join(', ');
    }

    return "Correct";
  }
}

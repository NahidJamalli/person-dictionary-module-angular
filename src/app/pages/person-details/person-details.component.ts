import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModelResponse } from 'src/app/models/base-model/response/base-model';
import { CityResponse } from 'src/app/models/city/cityResponse';
import { PersonRelativeResponse } from 'src/app/models/person/response/personRelativeResponse';
import { PersonListResponse, PersonResponse } from 'src/app/models/person/response/personResponse';
import { CityListService } from 'src/app/services/city-list/city-list.service';
import { PersonService } from 'src/app/services/person/person.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  constructor(public personService: PersonService,
    private validService: ValidationService,
    private cityListService: CityListService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  uiMessage: string = "";
  uiMessageType: string = "primary";

  tempNumber: string = "";
  tempType: number = 0;

  tempRelativeType: number = 1;
  tempRelativeId: number = 0;

  cityList: CityResponse[] = [];

  personDetail: PersonResponse = {} as PersonResponse;
  people: PersonListResponse = {} as PersonListResponse;

  relatedPersonTypes = ['Co-Worker', 'Friend', 'Relative', 'Other'];
  phoneNumberTypes = ['Mobile', 'Work', 'Home'];

  ngOnInit(): void {
    this.personDetail.city = {} as CityResponse;

    this.activatedRoute.params.subscribe(
      (params) => {
        if (params["id"] !== 0) {
          this.loadPersonDetails(params["id"]);
        }
      }
    );

    this.loadPersonList();
    this.loadCities();
  }

  //#region PERSON DETAILS
  async loadPersonDetails(id: number): Promise<void> {
    let personResponse = await this.personService.getPerson(`/people/${id}`);


    if (personResponse.hasError) {
      this.uiMessage = personResponse.error.error.userMessage;
    } else {
      this.personDetail = personResponse.data;
      this.personDetail.city = this.personDetail.city || {} as CityResponse;
      this.personDetail.phoneNumbers = this.personDetail.phoneNumbers || [];
      this.personDetail.relatedPeople = this.personDetail.relatedPeople || [];
    }
  }

  async loadPersonList(): Promise<void> {
    let personList = await this.personService.getPersonList({ skip: 0, take: 100, firstName: '', lastName: '', personalNumber: '' });

    if (personList.hasError) {
      this.uiMessage = personList.error.error.userMessage;
    } else {
      this.people = personList.data;
    }
  }
  //#endregion

  //#region CITY LIST
  async loadCities(): Promise<void> {
    let cityListResponse = await this.cityListService.getCityList();

    if (cityListResponse.hasError) {
      this.uiMessage = cityListResponse.error.error.userMessage;
    } else {
      this.cityList = cityListResponse.data;
    }
  }
  //#endregion

  //#region PHONE NUMBER
  onAddNumber(): void {
    if (this.tempNumber !== '') {
      this.personDetail.phoneNumbers.push({ id: 0, type: +this.tempType, number: this.tempNumber });
      this.tempNumber = "";
      this.tempType = 0;
    }
  }

  removePhone(id: number): void {
    if (!this.personDetail.phoneNumbers || this.personDetail.phoneNumbers.length === 0) {
      return;
    }

    var numberIndex = this.personDetail.phoneNumbers.findIndex(n => n.id === id);
    this.personDetail.phoneNumbers.splice(numberIndex, 1);
  }
  //#endregion

  //#region RELATIVE
  async removeRelative(id: number): Promise<void> {
    if (!this.personDetail.relatedPeople || this.personDetail.relatedPeople.length === 0) {
      return;
    }

    var numberIndex = this.personDetail.relatedPeople.findIndex(n => n.id === id);
    this.personDetail.relatedPeople.splice(numberIndex, 1);
  }

  async onAddRelative(): Promise<void> {
    if (this.tempRelativeId > 0) {
      let _relPeople = this.people.peopleData.filter(n => n.id == this.tempRelativeId);

      this.personDetail.relatedPeople.push({
        personId: +this.tempRelativeId,
        relativeType: +this.tempRelativeType,
        firstName: _relPeople[0].firstName,
        lastName: _relPeople[0].lastName
      } as PersonRelativeResponse);

      this.tempRelativeId = 0;
      this.tempRelativeType = 0;
    }
  }
  //#endregion

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const base64Photo = window.btoa(String.fromCharCode(...new Uint8Array(await file.arrayBuffer())));
      this.personDetail.photo = base64Photo;
    }
  }

  async onSubmitClick(): Promise<void> {
    let personModel = {
      id: this.personDetail.id,
      firstName: this.personDetail.firstName,
      lastName: this.personDetail.lastName,
      gender: +this.personDetail.gender,
      personalNumber: this.personDetail.personalNumber,
      photo: this.personDetail.photo,
      birthDate: this.personDetail.birthDate,
      cityId: +this.personDetail.city.id,
      phoneNumbers: this.personDetail.phoneNumbers,
      relatedPeople: this.personDetail.relatedPeople
    };

    let personResponse = {} as BaseModelResponse<PersonResponse>;

    if (!this.personDetail.id) {
      personResponse = await this.personService.addPerson(personModel);
    }
    else {
      personResponse = await this.personService.updatePerson(personModel);
    }

    if (personResponse.hasError) {
      this.uiMessage = personResponse.error.error.userMessage;
      this.validService.validationResponse = personResponse.error.error;
    } else {
      this.uiMessage = !this.personDetail.id ? "Person added successfully" : "Person updated successfully";
      this.personDetail = personResponse.data;

      this.router.navigate(['/']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person/person.service';
import { PersonListResponse } from '../../models/person/response/personResponse';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  constructor(private personService: PersonService) { }

  personList: PersonListResponse = {} as PersonListResponse;
  uiMessage: string = "";

  // FILTER
  searchFirstname: string = "";
  searchLastname: string = "";
  searchPersonalNumber: string = "";

  // PAGINATION
  skip: number = 0;
  take: number = 2;

  currentPage(): number {
    return Math.floor(this.skip / this.take);
  }

  async ngOnInit(): Promise<void> {
    this.loadPersonList(this.skip, this.take);
  }

  async submitFilter(): Promise<void> {
    this.skip = 0;
    this.take = 2;
    this.loadPersonList(this.skip, this.take, this.searchFirstname, this.searchLastname, this.searchPersonalNumber);
  }

  async onClearClick(): Promise<void> {
    this.searchFirstname = '';
    this.searchLastname = '';
    this.searchPersonalNumber = '';
    this.skip = 0;
    this.take = 2;
    this.loadPersonList(this.skip, this.take);
  }

  async deletePerson(id: number): Promise<void> {
    this.uiMessage = "Deleting...";

    let deleteResponse = await this.personService.deletePerson(`/people/${id}`);
    if (deleteResponse.hasError) {
      this.uiMessage = `Could not delete user: ${deleteResponse.error.error.message}`;
    } else {
      this.uiMessage = "User deleted successfully";
      this.submitFilter();
    }
  }

  async loadPersonList(skip: number, take: number, searchFirstname: string = '', searchLastname: string = '', searchPersonalNumber: string = ''): Promise<void> {
    this.uiMessage = "Loading...";

    let pList = await this.personService.getPersonList({ skip: skip, take: take, firstName: searchFirstname, lastName: searchLastname, personalNumber: searchPersonalNumber, });

    if (pList.hasError) this.uiMessage = pList.error.error.userMessage;
    else this.personList = pList.data;
    this.uiMessage = "";
  }

  async onPageChanged(stepType: string, selectedPage: number, searchFirstname: string, searchLastname: string, searchPersonalNumber: string) {
    if (stepType === ">") {
      this.skip += this.take;
    } else if (stepType === "<") {
      this.skip -= this.take;
    } else if (stepType === ".") {
      this.skip = selectedPage * this.take;
    }

    this.loadPersonList(this.skip, this.take, searchFirstname, searchLastname, searchPersonalNumber);
  }

  getNumArray(): Array<number> {
    return [...Array(Math.ceil((this.personList.totalPeopleCount || 0) / this.take)).keys()];
  }

  getActiveAttribute(n: number): string {
    if (this.currentPage() == n) {
      return "active";
    }

    return "";
  }
}

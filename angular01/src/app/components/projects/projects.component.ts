import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import * as _ from 'lodash';    

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  public allPeople: any;
  public people: any;
  public selectedCountry = '';
  public countries = Array();
  results = [];
  public sortFirst = false;
  public loading = true;

  constructor(private common: CommonService) { }

  ngOnInit() {
    if (this.common.people.length === 0) {
      this.loadData()
    } else {
      this.allPeople = this.common.people;
      this.people = this.allPeople;
      this.fillComboBox();
      this.loading = false;
    }
  }

  private loadData() {
    console.log('init')
    //tra ve JSON array
    this.common.getRandomPeople().subscribe(result => {
      if (result && result.results) {
        this.common.people = _.orderBy(
          result.results,
          ['name.first'],
          ['asc']
        )
        this.allPeople = this.common.people;
        this.people = this.allPeople;
        console.log('this.people', this.people)
        // people.forEach((person: any) => {
        //   console.log('person', person.name.first)
        // });

        this.common.userCount$.next(this.people.length);
        const maleCount = this.people.filter((person: { gender: string; }) => 
          person.gender === 'male').length;
        this.common.maleCount$.next(maleCount);
        this.common.femaleCount$.next(this.people.length - maleCount);
        this.fillComboBox();
        this.loading = false;   
      } 
    });
  }

  fillComboBox() {
    let countries = Array();
    this.people.forEach((person: { location: { country: any; }; }) => {
      if (!countries.includes(person.location.country)) {
        countries.push(person.location.country);
      }
    })
    this.countries = Array();
    countries = _.orderBy(countries);
    countries.forEach(country => {
      this.countries.push({
        value: country, 
        display: country});
    }) 
    if (this.selectedCountry === '' && this.countries.length > 0) {
      this.selectedCountry = this.countries[0].value;
      this.onChange();
    }
  }

  public onChange() {
    console.log('Have chose', this.selectedCountry);
    if (this.people) {
      this.people = this.allPeople.filter(
        (person: { location: { selectedCountry: string; }; }) => 
        person.location.selectedCountry === this.selectedCountry
      )
    } else {
      this.loadData();
    }
  }

  public sort(columnName: any) {
    console.log("sorted");
    if (this.sortFirst) {
      this.people = _.orderBy(this.people, [columnName], ['asc'])
    } else {
      this.people = _.orderBy(this.people, [columnName], ['desc'])
    }
    this.sortFirst = !this.sortFirst;
  }

}


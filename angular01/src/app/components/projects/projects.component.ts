import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public people: any;

  constructor(private common: CommonService) { }

  ngOnInit(): void {
    console.log('init')
    //tra ve JSON array
    this.common.getRandomPeople().subscribe(result => {
      if (result && result.results) {
        this.people = result.results;
        console.log('this.people', this.people)
        // people.forEach((person: any) => {
        //   console.log('person', person.name.first)
        // });
      } 
    });
  }

}

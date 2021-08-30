import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public userCount = 0;
  public maleCount = 0;
  public femaleCount = 0;


  constructor(private common: CommonService) { }

  ngOnInit() {
    this.common.userCount$.subscribe(count => {
      this.userCount = count;
    })
    this.common.maleCount$.subscribe(count => {
      this.maleCount = count;
    })
    this.common.femaleCount$.subscribe(count => {
      this.femaleCount = count;
    })
  }

}

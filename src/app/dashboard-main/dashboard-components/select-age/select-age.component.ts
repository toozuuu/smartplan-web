import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-age',
  templateUrl: './select-age.component.html',
  styleUrls: ['./select-age.component.scss']
})
export class SelectAgeComponent implements OnInit {
  age: any;
  gender: any;

  constructor(private router:Router) { }

  ngOnInit() {
    this.gender = sessionStorage.getItem('$gender');
  }

  selectAge() {
    if(this.age !== undefined){
      sessionStorage.setItem('$age',this.age);
      this.router.navigate(['/dashboard/goal']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-gender',
  templateUrl: './select-gender.component.html',
  styleUrls: ['./select-gender.component.scss']
})
export class SelectGenderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  selectGender(gender: string) {
    sessionStorage.setItem('$gender', gender);
    this.router.navigate(['/dashboard/age']);
  }
}

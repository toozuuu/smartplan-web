import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-select-goal',
  templateUrl: './select-goal.component.html',
  styleUrls: ['./select-goal.component.scss']
})
export class SelectGoalComponent implements OnInit {
  gender: any;


  goalTypes = [
    {
      'id': 1,
      'name': 'Weight Loss'
    },
    {
      'id': 2,
      'name': 'Muscle Gain'
    },
    {
      'id': 3,
      'name': 'Maintain Fitness'
    }
  ];

  goalTime = [
    {
      'id': 1,
      'month': 1
    },
    {
      'id': 2,
      'month': 2
    },
    {
      'id': 3,
      'month': 3
    },
    {
      'id': 4,
      'month': 4
    },
    {
      'id': 5,
      'month': 5
    },
    {
      'id': 6,
      'month': 6
    },
    {
      'id': 7,
      'month': 7
    },
    {
      'id': 8,
      'month': 8
    },
    {
      'id': 9,
      'month': 9
    },
    {
      'id': 10,
      'month': 10
    },
    {
      'id': 11,
      'month': 11
    },
    {
      'id': 12,
      'month': 12
    }
  ];
  selectedGoalType: any;
  selectedTime: any;
  isUpdate:boolean = false;

  constructor(private router:Router,private route:ActivatedRoute) { }


  ngOnInit() {
    this.route.queryParams.subscribe(param=>{
      if(param['isDashboard']){
        this.isUpdate = true;
        this.gender = localStorage.getItem('$gender');
      }else {
        this.isUpdate = false;
        this.gender = sessionStorage.getItem('$gender');
      }
    });
  }

  selectGoalNTime() {
    if (this.selectedGoalType !== undefined && this.selectedTime !== undefined) {
      sessionStorage.setItem('$goalType', this.selectedGoalType);
      sessionStorage.setItem('$goalTime', this.selectedTime);
      if(this.isUpdate){
        this.router.navigate(['/dashboard/plan'],{queryParams: {isDashboard: true}});
      }else {
        this.router.navigate(['/dashboard/plan']);
      }
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {log} from 'util';

@Component({
  selector: 'app-select-plan',
  templateUrl: './select-plan.component.html',
  styleUrls: ['./select-plan.component.scss']
})
export class SelectPlanComponent implements OnInit {
  gender: string;
  age: string;

  weight: any;
  height: any;
  bodyFat: any;
  fatFreeMass: any;
  activityLevel: any;
  caloriesToAdd: any;
  dailyReq: any;
  dailyReqNon: any;

  protein_workout: any;
  carbs_workout: any;
  fat_workout: any;

  meals_per_day_workout: any;

  protein_non_workout: any;
  carbs_non_workout: any;
  fat_non_workout: any;

  meals_per_day_non_workout: any;

  name: any;

  fat = [
    {
      'id': 1,
      'percentage': 4
    },
    {
      'id': 2,
      'percentage': 7
    },
    {
      'id': 3,
      'percentage': 12
    },
    {
      'id': 4,
      'percentage': 15
    },
    {
      'id': 5,
      'percentage': 20
    },
    {
      'id': 6,
      'percentage': 25
    },
    {
      'id': 7,
      'percentage': 30
    },
    {
      'id': 8,
      'percentage': 35
    },
    {
      'id': 9,
      'percentage': 40
    }

  ];

  activityLevelList = [
    {
      'id': 1,
      'type': 'sedentary (little or no exercise)'
    },
    {
      'id': 2,
      'type': 'lightly active (light exercise/sports 1-3 days/week)'
    },
    {
      'id': 3,
      'type': 'moderately active (moderate exercise/sports 3-5 days/week)'
    },
    {
      'id': 4,
      'type': 'very active (intense exercise/sports 6-7 days a week)'
    },
    {
      'id': 5,
      'type': 'Highly active (highly intense exercise & physical job or 2x training)'
    }
  ];

  calariesToAddList = [
    {
      'id': 1,
      'count': -1000
    },
    {
      'id': 2,
      'count': -900
    },
    {
      'id': 3,
      'count': -800
    },
    {
      'id': 4,
      'count': -700
    },
    {
      'id': 5,
      'count': -600
    },
    {
      'id': 6,
      'count': -500
    },
    {
      'id': 7,
      'count': -400
    },
    {
      'id': 8,
      'count': -300
    },
    {
      'id': 9,
      'count': -200
    },
    {
      'id': 10,
      'count': -100
    },
    {
      'id': 11,
      'count': 100
    },
    {
      'id': 12,
      'count': 200
    },
    {
      'id': 13,
      'count': 300
    },
    {
      'id': 14,
      'count': 400
    },
    {
      'id': 15,
      'count': 500
    },
    {
      'id': 16,
      'count': 600
    },
    {
      'id': 17,
      'count': 700
    },
    {
      'id': 18,
      'count': 800
    },
    {
      'id': 19,
      'count': 900
    },
    {
      'id': 20,
      'count': 1000
    }
  ];

  selectedBodyFat: any;
  isUpdate: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      if (param['isDashboard']) {
        this.isUpdate = true;
        this.gender = localStorage.getItem('$gender');
        this.age = localStorage.getItem('$age');
        this.name = localStorage.getItem('$name');
      } else {
        this.isUpdate = false;
        this.gender = sessionStorage.getItem('$gender');
        this.age = sessionStorage.getItem('$age');
        this.name = sessionStorage.getItem('$name');
      }
    });

  }

  next() {

    if (this.weight !== undefined && this.height !== undefined && this.selectedBodyFat !== undefined && this.fatFreeMass !== undefined &&
      this.estimatedBmr !== undefined && this.activityLevel !== undefined && this.caloriesToAdd !== undefined && this.dailyReq !== undefined && this.protein_workout !== undefined &&
      this.carbs_workout !== undefined && this.fat_workout !== undefined && this.meals_per_day_workout !== undefined && this.protein_non_workout !== undefined &&
      this.carbs_non_workout !== undefined && this.fat_non_workout !== undefined && this.meals_per_day_non_workout !== undefined) {

      sessionStorage.setItem('weight', this.weight);
      sessionStorage.setItem('height', this.height);
      sessionStorage.setItem('bodyFat', this.selectedBodyFat);
      sessionStorage.setItem('fatFreeMass', this.fatFreeMass);
      sessionStorage.setItem('estimatedBmr', this.estimatedBmr);
      sessionStorage.setItem('activityLevel', this.activityLevel);
      sessionStorage.setItem('caloriesToAdd', this.caloriesToAdd);
      sessionStorage.setItem('dailyReq', this.dailyReq);
      sessionStorage.setItem('dailyReqNon', this.dailyReqNon);
      sessionStorage.setItem('protein_workout', this.protein_workout);
      sessionStorage.setItem('carbs_workout', this.carbs_workout);
      sessionStorage.setItem('fat_workout', this.fat_workout);
      sessionStorage.setItem('meals_per_day_workout', this.meals_per_day_workout);
      sessionStorage.setItem('protein_non_workout', this.protein_non_workout);
      sessionStorage.setItem('carbs_non_workout', this.carbs_non_workout);
      sessionStorage.setItem('fat_non_workout', this.fat_non_workout);
      sessionStorage.setItem('meals_per_day_non_workout', this.meals_per_day_non_workout);

      if (this.isUpdate) {
        this.router.navigate(['/dashboard/food'], {queryParams: {isDashboard: true}});

      } else {
        this.router.navigate(['/dashboard/food']);

      }

    }

  }

  fatFreeCal(weight, selectedBodyFat) {
    let temp = parseFloat(weight) - (parseFloat(weight) * parseFloat(selectedBodyFat)) / 100;
    this.fatFreeMass = temp.toFixed();
    return temp.toFixed();
  }

  convertValue(value: string) {
    return parseFloat(value);
  }

  estimatedBmr: any;

  estimatedBmrMale(number: number) {
    this.estimatedBmr = number.toFixed();
    return number.toFixed();
  }

  estimatedBmrFemale(number: number) {
    this.estimatedBmr = number.toFixed();
    return number.toFixed();
  }

  selectCaloriesToAdd(activityLevel) {

    switch (activityLevel) {

      case 'sedentary (little or no exercise)':
        this.dailyReq = this.estimatedBmr * 1.2 + parseFloat(this.caloriesToAdd);
        this.dailyReqNon = this.dailyReq - 250;

        this.protein_workout = Number((this.dailyReq * 35 / 100 / 4).toFixed(1));
        this.carbs_workout = Number((this.dailyReq * 45 / 100 / 4).toFixed(1));
        this.fat_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));


        this.protein_non_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));
        this.fat_non_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));
        this.carbs_non_workout = Number(((this.dailyReq * 45 / 100 / 4) - 62.5).toFixed(1));


        break;

      case 'lightly active (light exercise/sports 1-3 days/week)':
        this.dailyReq = this.estimatedBmr * 1.375 + parseFloat(this.caloriesToAdd);
        this.dailyReqNon = this.dailyReq - 250;

        this.protein_workout = Number((this.dailyReq * 35 / 100 / 4).toFixed(1));
        this.carbs_workout = Number((this.dailyReq * 45 / 100 / 4).toFixed(1));
        this.fat_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));


        this.protein_non_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));
        this.fat_non_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));
        this.carbs_non_workout = Number(((this.dailyReq * 45 / 100 / 4) - 62.5).toFixed(1));
        break;
      case 'moderately active (moderate exercise/sports 3-5 days/week)':
        this.dailyReq = this.estimatedBmr * 1.55 + parseFloat(this.caloriesToAdd);
        this.dailyReqNon = this.dailyReq - 250;

        this.protein_workout = Number((this.dailyReq * 35 / 100 / 4).toFixed(1));
        this.carbs_workout = Number((this.dailyReq * 45 / 100 / 4).toFixed(1));
        this.fat_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));


        this.protein_non_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));
        this.fat_non_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));
        this.carbs_non_workout = Number(((this.dailyReq * 45 / 100 / 4) - 62.5).toFixed(1));
        break;

      case 'very active (intense exercise/sports 6-7 days a week)':
        this.dailyReq = this.estimatedBmr * 1.725 + parseFloat(this.caloriesToAdd);
        this.dailyReqNon = this.dailyReq - 250;

        this.protein_workout = Number((this.dailyReq * 35 / 100 / 4).toFixed(1));
        this.carbs_workout = Number((this.dailyReq * 45 / 100 / 4).toFixed(1));
        this.fat_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));


        this.protein_non_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));
        this.fat_non_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));
        this.carbs_non_workout = Number(((this.dailyReq * 45 / 100 / 4) - 62.5).toFixed(1));
        break;

      case 'Highly active (highly intense exercise & physical job or 2x training)':
        this.dailyReq = this.estimatedBmr * 1.9 + parseFloat(this.caloriesToAdd);
        this.dailyReqNon = this.dailyReq - 250;

        this.protein_workout = Number((this.dailyReq * 35 / 100 / 4).toFixed(1));
        this.carbs_workout = Number((this.dailyReq * 45 / 100 / 4).toFixed(1));
        this.fat_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));


        this.protein_non_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));
        this.fat_non_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));
        this.carbs_non_workout = Number(((this.dailyReq * 45 / 100 / 4) - 62.5).toFixed(1));
        break;
    }
  }
}

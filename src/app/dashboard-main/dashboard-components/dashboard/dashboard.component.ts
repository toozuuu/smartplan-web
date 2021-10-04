import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import Swal from "sweetalert2";
import {InteractionService} from "../../../service/interaction.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  name: any;
  email: any;
  userId: any;
  address: any;
  addressId: any;
  gender: string;
  newMealsList: any;
  mealList: any;
  dailyReq: any;

  selectedMeals = [];
  orderDetailList: any;
  weight: any;
  age: any;
  height: any;
  dailyReqOld: any;
  activityLevel: any;

  bodyFat: any;
  fatFreeMass: any;
  caloriesToAdd: any;
  dailyReqNon: any;

  protein_workout: any;
  carbs_workout: any;
  fat_workout: any;

  meals_per_day_workout: any;

  protein_non_workout: any;
  carbs_non_workout: any;
  fat_non_workout: any;

  meals_per_day_non_workout: any;

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

  estimatedBmr: any;
  numOfDays: any;

  constructor(private router: Router,
              private interactionService: InteractionService,
              private userService: UserService) {
    this.userId = localStorage.getItem('$id');
    this.name = localStorage.getItem('$name');
    this.email = localStorage.getItem('$email');
    this.gender = localStorage.getItem('$gender');
    this.dailyReqOld = localStorage.getItem('$dailyReq');
    this.address = localStorage.getItem('$address_address');
    this.addressId = localStorage.getItem('$address_id');
    this.numOfDays = parseInt(localStorage.getItem('numOfDays'));
  }

  ngOnInit() {
    this.common();
  }

  common() {
    this.userService.fetchMealsByUserId(this.userId).subscribe(mealList => {
      this.mealList = mealList;
    });
    this.userService.fetchAllMeals().subscribe(newMeals => {
      this.newMealsList = newMeals;
    });
    this.fetchAllMyOrderDetails();
  }


  orderNow() {
    if (this.selectedMeals.length > 0) {
      let body = [];
      for (let item of this.selectedMeals) {
        body.push(this.commonBody(item.price, item.id))
      }
      this.userService.createCart(body).subscribe(() => {
        this.router.navigate(['/dashboard/checkout']);
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please select meal(s)!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  commonBody(unitPrice, id) {
    return {
      "email": this.email,
      "unitPrice": unitPrice,
      "quantity": 1,
      "mealId": {"id": id}
    }
  }

  fetchAllMyOrderDetails() {
    this.userService.purchaseDetailsByUsername(localStorage.getItem('$email')).subscribe(orderDetails => {
      this.orderDetailList = orderDetails;
    });
  }

  addToCart(meal: any) {
    if (this.selectedMeals.length > 0) {
      for (let mealList of this.selectedMeals) {
        if (mealList.id !== meal.id) {
          this.selectedMeals.push(meal);
        }
      }
    } else {
      this.selectedMeals.push(meal);
    }
    sessionStorage.setItem('selectMeals', JSON.stringify(this.selectedMeals))
    this.interactionService.passSelectedData(this.selectedMeals);
  }

  convertDate(created: any) {
    let date = new Date(new Date(created)),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join('-');
  }

  setupNewGoal() {
    this.router.navigate(['/dashboard/goal'], {queryParams: {isDashboard: true}})
  }

  fatFreeCal(weight, selectedBodyFat) {
    let temp = parseFloat(weight) - (parseFloat(weight) * parseFloat(selectedBodyFat)) / 100;
    this.fatFreeMass = temp.toFixed();
    let _estimate;
    if (this.gender === 'male') {
      _estimate = 66.50 + (13.75 * this.convertValue(this.fatFreeMass)) + (5 * this.convertValue(this.height)) - (6.76 * this.convertValue(this.age));
      this.estimatedBmr = _estimate.toFixed();
    } else {
      _estimate = 655.10 + (9.56 * this.convertValue(this.fatFreeMass)) + (1.85 * this.convertValue(this.height)) - (4.68 * this.convertValue(this.age));
      this.estimatedBmr = _estimate.toFixed();
    }
  }

  convertValue(value: string) {
    return parseFloat(value);
  }

  loading() {
    Swal.fire({
      title: 'Processing...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
  }

  convertJSON(newMeal: any) {
    return JSON.stringify(newMeal);
  }

}

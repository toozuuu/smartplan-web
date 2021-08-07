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

  calariesToAddList = [
    {
      'id': 1,
      'count': 100
    },
    {
      'id': 2,
      'count': 200
    },
    {
      'id': 3,
      'count': 300
    },
    {
      'id': 4,
      'count': 400
    },
    {
      'id': 5,
      'count': 500
    },
    {
      'id': 6,
      'count': 600
    },
    {
      'id': 7,
      'count': 700
    },
    {
      'id': 8,
      'count': 800
    },
    {
      'id': 9,
      'count': 900
    },
    {
      'id': 10,
      'count': 1000
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
  selectedBodyFat: any;
  numOfDays: any;

  constructor(private router: Router,
              private interactionService: InteractionService,
              private userService: UserService) {
    this.userId = localStorage.getItem('$id');
    this.name = localStorage.getItem('$name');
    this.email = localStorage.getItem('$email');
    this.gender = localStorage.getItem('$gender');
    this.dailyReqOld = localStorage.getItem('$dailyReq');
    this.address = localStorage.getItem('$address_adrdess');
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

  logout() {

    Swal.fire({
      title: 'Sign Out',
      icon: 'warning',
      text: 'You will be returned to the login screen',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Log out'
    }).then((result) => {
      if (result.value) {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }

  updateAddress() {
    let addressBody = {
      'id': this.addressId,
      'adrdess': this.address
    }
    this.userService.updateAddress(addressBody).subscribe(result => {
      if (this.address !== result['adrdess'] && result['adrdess'] !== undefined) {
        this.address = result['adrdess'];
        localStorage.setItem('$address_adrdess', this.address);
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'your address is updated!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  orderNow() {
    if (this.selectedMeals.length > 0) {
      let body = [];
      for (let item of this.selectedMeals) {
        body.push(this.commonBody(item.price, item.id))
      }
      this.userService.createCart(body).subscribe(result => {
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
    this.selectedMeals.push(meal);
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
        this.dailyReq = this.estimatedBmr * 1.375 +  parseFloat(this.caloriesToAdd);
        this.dailyReqNon = this.dailyReq - 250;

        this.protein_workout = Number((this.dailyReq * 35 / 100 / 4).toFixed(1));
        this.carbs_workout = Number((this.dailyReq * 45 / 100 / 4).toFixed(1));
        this.fat_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));

        this.protein_non_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));
        this.fat_non_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));
        this.carbs_non_workout = Number(((this.dailyReq * 45 / 100 / 4) - 62.5).toFixed(1));
        break;
      case 'moderately active (moderate exercise/sports 3-5 days/week)':
        this.dailyReq = this.estimatedBmr * 1.55 +  parseFloat(this.caloriesToAdd);
        this.dailyReqNon = this.dailyReq - 250;

        this.protein_workout = Number((this.dailyReq * 35 / 100 / 4).toFixed(1));
        this.carbs_workout = Number((this.dailyReq * 45 / 100 / 4).toFixed(1));
        this.fat_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));

        this.protein_non_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));
        this.fat_non_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));
        this.carbs_non_workout = Number(((this.dailyReq * 45 / 100 / 4) - 62.5).toFixed(1));
        break;

      case 'very active (intense exercise/sports 6-7 days a week)':
        this.dailyReq = this.estimatedBmr * 1.725 +  parseFloat(this.caloriesToAdd);
        this.dailyReqNon = this.dailyReq - 250;

        this.protein_workout = Number((this.dailyReq * 35 / 100 / 4).toFixed(1));
        this.carbs_workout = Number((this.dailyReq * 45 / 100 / 4).toFixed(1));
        this.fat_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));

        this.protein_non_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));
        this.fat_non_workout = Number((this.dailyReq * 20 / 100 / 9).toFixed(1));
        this.carbs_non_workout = Number(((this.dailyReq * 45 / 100 / 4) - 62.5).toFixed(1));
        break;

      case 'Highly active (highly intense exercise & physical job or 2x training)':
        this.dailyReq = this.estimatedBmr * 1.9 +  parseFloat(this.caloriesToAdd);
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

  reCalculate() {

    if (this.weight !== undefined && this.height !== undefined && this.selectedBodyFat !== undefined && this.fatFreeMass !== undefined && this.estimatedBmr !== undefined &&
      this.activityLevel !== undefined && this.caloriesToAdd !== undefined && this.dailyReq !== undefined && this.dailyReqNon !== undefined) {
      this.loading();
      let body = {
        "id": this.userId,
        "age": this.age,
        "weight": this.weight,
        "height": this.height,
        "bodyFat": this.selectedBodyFat,
        "fatFreeMass": this.fatFreeMass,
        "estimatedBmr": this.estimatedBmr,
        "activityLevel": this.activityLevel,
        "caloriesToAdd": this.caloriesToAdd,
        "dailyReq": this.dailyReq,
        "dailyReqNon": this.dailyReqNon,
        "caloriePlanList": [
          {
            'protein': this.protein_workout,
            'carbs': this.carbs_workout,
            'fat': this.fat_workout,
            'mealsPerDay': parseFloat(localStorage.getItem('workout')),
            'type': 'workout'
          },
          {
            'protein': this.protein_non_workout,
            'carbs': this.carbs_non_workout,
            'fat': this.fat_non_workout,
            'mealsPerDay': parseFloat(localStorage.getItem('non-workout')),
            'type': 'non-workout'
          }
        ],
      };

      this.userService.updateUserPlanV1(body).subscribe(result => {
        if (result) {
          Swal.close();
          this.common();
          this.dailyReqOld = this.dailyReq;

          this.userService.loginIn({
            'email': localStorage.getItem('email'),
            'password': localStorage.getItem('password')
          }).subscribe(result => {
            if (result['success']) {
              localStorage.setItem('$LOG', 'LOGGED');
              localStorage.setItem('$id', result['id']);
              localStorage.setItem('$dailyReq', result['dailyReq']);
              localStorage.setItem('$gender', result['gender']);
              localStorage.setItem('numOfDays', result['numOfDays']);
              localStorage.setItem('$age', result['age']);
              localStorage.setItem('$email', result['email']);
              localStorage.setItem('$name', result['name']);
              localStorage.setItem('$password', result['password']);
              localStorage.setItem('$address_id', result['address']['id']);
              localStorage.setItem('$address_adrdess', result['address']['adrdess']);
              localStorage.setItem('workout', result['caloriePlanList'][0]['mealsPerDay']);
              localStorage.setItem('protein-workout', result['caloriePlanList'][0]['protein']);
              localStorage.setItem('non-workout', result['caloriePlanList'][1]['mealsPerDay']);
              localStorage.setItem('protein-non-workout', result['caloriePlanList'][1]['protein']);
              localStorage.setItem('$address_adrdess', result['address']['adrdess']);
              let dailyTarget1 = parseFloat(result['caloriePlanList'][0]['protein']) / parseFloat(result['caloriePlanList'][0]['mealsPerDay']);
              let dailyTarget2 = parseFloat(result['caloriePlanList'][1]['protein']) / parseFloat(result['caloriePlanList'][1]['mealsPerDay']);
              let dailyTarget = dailyTarget1 + dailyTarget2;

              localStorage.setItem('dailyTarget', dailyTarget.toString());
              this.numOfDays = parseInt(localStorage.getItem('numOfDays'));
              this.dailyReqOld = localStorage.getItem('dailyTarget');
            }
          }, () => {
            Swal.close();
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Something went wrong!',
              showConfirmButton: false,
              timer: 1500
            })
          });

        }
      }, () => {
        Swal.close();
      });


    }
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
}

import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-select-food',
  templateUrl: './select-food.component.html',
  styleUrls: ['./select-food.component.scss']
})
export class SelectFoodComponent implements OnInit {

  preWorkoutFoods = [
    {
      'id': 1, 'name': 'Oats'
    },
    {
      'id': 2, 'name': 'Brown Rice'
    },
    {
      'id': 3, 'name': 'White Basmati Rice'
    },
    {
      'id': 4, 'name': 'Sweet Potato'
    },
    {
      'id': 5, 'name': 'White Potatoes'
    },
    {
      'id': 6, 'name': 'Whole Wheat Pasta'
    },
    {
      'id': 7, 'name': 'White Penne Pasta'
    }
  ];

  postWorkoutFoods = [
    {
      'id': 8, 'name': 'Whole Large Free Range Egg'
    },
    {
      'id': 9, 'name': 'Free Range Egg Whites'
    },
    {
      'id': 10, 'name': 'Free Range Chicken Breast'
    },
    {
      'id': 11, 'name': 'Pork Loin Steaks'
    },
    {
      'id': 12, 'name': 'Lean Ground Beef'
    },
    {
      'id': 13, 'name': 'Fresh Salmon Fillet'
    },
    {
      'id': 14, 'name': 'Whey Protein Isolate Powder'
    }
  ];

  highProteinFoods = [
    {
      'id': 15, 'name': 'Whole Large Free Range Egg'
    },
    {
      'id': 16, 'name': 'Free Range Egg Whites'
    },
    {
      'id': 17, 'name': 'Free Range Chicken Breast'
    },
    {
      'id': 18, 'name': 'Pork Loin Steaks'
    },
    {
      'id': 19, 'name': 'Lean Ground Beef'
    },
    {
      'id': 20, 'name': 'Fresh Salmon Fillet'
    },
    {
      'id': 21, 'name': 'Whey Protein Powder'
    }
  ];

  highCarbohydrateFoods = [
    {
      'id': 22, 'name': 'Oats'
    },
    {
      'id': 23, 'name': 'Brown Rice'
    },
    {
      'id': 24, 'name': 'White Basmati Rice'
    },
    {
      'id': 25, 'name': 'Sweet Potato'
    },
    {
      'id': 26, 'name': 'White Potatoes'
    },
    {
      'id': 27, 'name': 'Whole Wheat Pasta'
    },
    {
      'id': 28, 'name': 'White Penne Pasta'
    }
  ];

  healthyFats = [
    {
      'id': 29, 'name': 'Organic Peanut Butter'
    },
    {
      'id': 30, 'name': 'Extra Virgin Olive Oli'
    },
    {
      'id': 31, 'name': 'Flaxseed Oil'
    },
    {
      'id': 32, 'name': 'Coconut Oil'
    },
    {
      'id': 33, 'name': 'Fresh Salmon Fillet'
    },
    {
      'id': 34, 'name': 'Avocado'
    },
    {
      'id': 35, 'name': 'Walnuts'
    }
  ];

  userId: any;
  isDashboard: boolean = false;


  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      if (param['isDashboard']) {
        this.isDashboard = true;
        this.userId = localStorage.getItem('$id');
        sessionStorage.setItem('$age',localStorage.getItem('$age'));
      }else{
        this.isDashboard = false;
      }
    });
  }

  selectPerWorkoutFoods(id: number, preWorkoutFoods: string) {
    let arr0 = [];
    if (this.selectPerWorkOutFoodsList.length > 0) {
      if (!this.selectPerWorkOutFoodsList.includes(id)) {
        this.selectPerWorkOutFoodsList.push(id);
      } else {
        for (let x of this.selectPerWorkOutFoodsList) {
          if (x !== id) {
            arr0.push(x);
          } else {
            document.getElementById(preWorkoutFoods + x).style.backgroundColor = 'unset';
          }
        }
        this.selectPerWorkOutFoodsList.length = 0;
        this.selectPerWorkOutFoodsList = arr0;
      }
    } else {
      this.selectPerWorkOutFoodsList.push(id);
    }

    for (let y of this.selectPerWorkOutFoodsList) {
      document.getElementById(preWorkoutFoods + y).style.backgroundColor = 'gray';
    }

  }

  selectPostWorkoutFoods(id: number, preWorkoutFoods: string) {
    let arr1 = [];
    if (this.selectPostWorkoutFoodsList.length > 0) {
      if (!this.selectPostWorkoutFoodsList.includes(id)) {
        this.selectPostWorkoutFoodsList.push(id);
      } else {
        for (let x of this.selectPostWorkoutFoodsList) {
          if (x !== id) {
            arr1.push(x);
          } else {
            document.getElementById(preWorkoutFoods + x).style.backgroundColor = 'unset';
          }
        }
        this.selectPostWorkoutFoodsList.length = 0;
        this.selectPostWorkoutFoodsList = arr1;
      }
    } else {
      this.selectPostWorkoutFoodsList.push(id);
    }

    for (let y of this.selectPostWorkoutFoodsList) {
      document.getElementById(preWorkoutFoods + y).style.backgroundColor = 'gray';
    }

  }

  selectHighProteinFoods(id: number, highProteinFoods: string) {
    let arr2 = [];
    if (this.selectHighProteinFoodsList.length > 0) {
      if (!this.selectHighProteinFoodsList.includes(id)) {
        this.selectHighProteinFoodsList.push(id);
      } else {
        for (let x of this.selectHighProteinFoodsList) {
          if (x !== id) {
            arr2.push(x);
          } else {
            document.getElementById(highProteinFoods + x).style.backgroundColor = 'unset';
          }
        }
        this.selectHighProteinFoodsList.length = 0;
        this.selectHighProteinFoodsList = arr2;
      }
    } else {
      this.selectHighProteinFoodsList.push(id);
    }

    for (let y of this.selectHighProteinFoodsList) {
      document.getElementById(highProteinFoods + y).style.backgroundColor = 'gray';
    }

  }

  selectHighCarbohydrateFoods(id: number, highProteinFoods: string) {
    let arr3 = [];
    if (this.selectHighCarbohydrateFoodsList.length > 0) {
      if (!this.selectHighCarbohydrateFoodsList.includes(id)) {
        this.selectHighCarbohydrateFoodsList.push(id);
      } else {
        for (let x of this.selectHighCarbohydrateFoodsList) {
          if (x !== id) {
            arr3.push(x);
          } else {
            document.getElementById(highProteinFoods + x).style.backgroundColor = 'unset';
          }
        }
        this.selectHighCarbohydrateFoodsList.length = 0;
        this.selectHighCarbohydrateFoodsList = arr3;
      }
    } else {
      this.selectHighCarbohydrateFoodsList.push(id);
    }

    for (let y of this.selectHighCarbohydrateFoodsList) {
      document.getElementById(highProteinFoods + y).style.backgroundColor = 'gray';
    }
  }

  selectHealthyFats(id: number, healthyFats: string) {
    let arr4 = [];
    if (this.selectHealthyFatsList.length > 0) {
      if (!this.selectHealthyFatsList.includes(id)) {
        this.selectHealthyFatsList.push(id);
      } else {
        for (let x of this.selectHealthyFatsList) {
          if (x !== id) {
            arr4.push(x);
          } else {
            document.getElementById(healthyFats + x).style.backgroundColor = 'unset';
          }
        }
        this.selectHealthyFatsList.length = 0;
        this.selectHealthyFatsList = arr4;
      }
    } else {
      this.selectHealthyFatsList.push(id);
    }

    for (let y of this.selectHealthyFatsList) {
      document.getElementById(healthyFats + y).style.backgroundColor = 'gray';
    }
  }


  selectPerWorkOutFoodsList = [];
  selectPostWorkoutFoodsList = [];
  selectHighProteinFoodsList = [];
  selectHighCarbohydrateFoodsList = [];
  selectHealthyFatsList = [];

  registerUser() {
    this.loading();

    let macronutrientFoodList = [];

    if (this.selectPerWorkOutFoodsList.length > 0) {
      for (let food of this.preWorkoutFoods) {
        for (let x of this.selectPerWorkOutFoodsList) {
          if (food.id === x) {
            macronutrientFoodList.push({
              'food': food.name,
              'foodType': 'Per Workout Food'
            });
          }
        }
      }
    }

    if (this.selectPostWorkoutFoodsList.length > 0) {
      for (let food of this.postWorkoutFoods) {
        for (let x of this.selectPostWorkoutFoodsList) {
          if (food.id === x) {
            macronutrientFoodList.push({
              'food': food.name,
              'foodType': 'Post Workout Food'
            });
          }
        }
      }
    }

    if (this.selectHighProteinFoodsList.length > 0) {
      for (let food of this.highProteinFoods) {
        for (let x of this.selectHighProteinFoodsList) {
          if (food.id === x) {
            macronutrientFoodList.push({
              'food': food.name,
              'foodType': 'High Protein Food'
            });
          }
        }
      }
    }

    if (this.selectHighCarbohydrateFoodsList.length > 0) {
      for (let food of this.highCarbohydrateFoods) {
        for (let x of this.selectHighCarbohydrateFoodsList) {
          if (food.id === x) {
            macronutrientFoodList.push({
              'food': food.name,
              'foodType': 'High Carbohydrate Food'
            });
          }
        }
      }
    }

    if (this.selectHealthyFatsList.length > 0) {
      for (let food of this.healthyFats) {
        for (let x of this.selectHealthyFatsList) {
          if (food.id === x) {
            macronutrientFoodList.push({
              'food': food.name,
              'foodType': 'Healthy Fats'
            });
          }
        }
      }
    }

    let body;

    if(this.isDashboard){
       body = {
         "id": this.userId,
         "age": sessionStorage.getItem('$age'),
         "weight": sessionStorage.getItem('weight'),
         "goalType": sessionStorage.getItem('$goalType'),
         "goalTime": sessionStorage.getItem('$goalTime'),
         "height": sessionStorage.getItem('height'),
         "bodyFat": sessionStorage.getItem('bodyFat'),
         "fatFreeMass": sessionStorage.getItem('fatFreeMass'),
         "estimatedBmr": sessionStorage.getItem('estimatedBmr'),
         "activityLevel": sessionStorage.getItem('activityLevel'),
         "caloriesToAdd": sessionStorage.getItem('caloriesToAdd'),
         "dailyReq": sessionStorage.getItem('dailyReq'),
         "dailyReqNon": sessionStorage.getItem('dailyReqNon'),
         "macronutrientFoodList": macronutrientFoodList,
         "caloriePlanList": [
           {
             'protein': sessionStorage.getItem('protein_workout'),
             'carbs': sessionStorage.getItem('carbs_workout'),
             'fat': sessionStorage.getItem('fat_workout'),
             'mealsPerDay': sessionStorage.getItem('meals_per_day_workout'),
             'type': 'workout'
           },
           {
             'protein': sessionStorage.getItem('protein_non_workout'),
             'carbs': sessionStorage.getItem('carbs_non_workout'),
             'fat': sessionStorage.getItem('fat_non_workout'),
             'mealsPerDay': sessionStorage.getItem('meals_per_day_non_workout'),
             'type': 'non-workout'
           }
         ]
      };

      this.userService.updateUserPlan(body).subscribe(result => {
        if (result) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your account has been updated!',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.router.navigate(['/dashboard']);
          })
        }
      }, () => {
        Swal.close();
      });
    }else{
       body = {
        "name": sessionStorage.getItem('$name'),
        "email": sessionStorage.getItem('$email'),
        "password": sessionStorage.getItem('$password'),
        "age": sessionStorage.getItem('$age'),
        "weight": sessionStorage.getItem('weight'),
        "goalType": sessionStorage.getItem('$goalType'),
        "goalTime": sessionStorage.getItem('$goalTime'),
        "consulter": sessionStorage.getItem('$consulter'),
        "height": sessionStorage.getItem('height'),
        "bodyFat": sessionStorage.getItem('bodyFat'),
        "fatFreeMass": sessionStorage.getItem('fatFreeMass'),
        "estimatedBmr": sessionStorage.getItem('estimatedBmr'),
        "activityLevel": sessionStorage.getItem('activityLevel'),
        'gender': sessionStorage.getItem('$gender'),
        "caloriesToAdd": sessionStorage.getItem('caloriesToAdd'),
        "dailyReq": sessionStorage.getItem('dailyReq'),
        "dailyReqNon": sessionStorage.getItem('dailyReqNon'),
        "macronutrientFoodList": macronutrientFoodList,
        "caloriePlanList": [
          {
            'protein': sessionStorage.getItem('protein_workout'),
            'carbs': sessionStorage.getItem('carbs_workout'),
            'fat': sessionStorage.getItem('fat_workout'),
            'mealsPerDay': sessionStorage.getItem('meals_per_day_workout'),
            'type': 'workout'
          },
          {
            'protein': sessionStorage.getItem('protein_non_workout'),
            'carbs': sessionStorage.getItem('carbs_non_workout'),
            'fat': sessionStorage.getItem('fat_non_workout'),
            'mealsPerDay': sessionStorage.getItem('meals_per_day_non_workout'),
            'type': 'non-workout'
          }
        ],
        "address": {
          "adrdess": sessionStorage.getItem('$address_adrdess')
        }
      };

      this.userService.loginUp(body).subscribe(result => {
        if (result) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User Registration Successful!',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.router.navigate(['/']);
          })
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

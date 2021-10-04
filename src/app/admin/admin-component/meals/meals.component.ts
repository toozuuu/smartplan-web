import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpRequest} from "@angular/common/http";
import {UserService} from "../../../service/user.service";
import {MatPaginator} from "@angular/material/paginator";
import {catchError, last, map} from "rxjs/operators";
import {of} from "rxjs";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {
  addMealForm: FormGroup;

  files: File[] = [];
  submitted: boolean = false;
  name: any;
  price: any;

  displayedColumns: string[] = ['id', 'image', 'name', 'category', 'price', 'ingredients', 'action', 'action1'];
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  imageArray = [];


  categoryList = [
    {
      'id': 1, 'name': 'Per Workout'
    },
    {
      'id': 2, 'name': 'Post Workout'
    }
  ];

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

  selectedCategory: any;
  addForm: FormGroup;
  rows: FormArray;
  isUpdateMeal: boolean = false;
  selectMealId: any;
  image: string;

  unitTypes: any;

  constructor(private _formBuilder: FormBuilder,
              private userService: UserService,
              private http: HttpClient) {
    this.reactiveForm();
    this.addForm = this._formBuilder.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });

    this.rows = this._formBuilder.array([]);
  }

  ngOnInit() {
    this.addForm.addControl('rows', this.rows);
    this.loadMeals();
    this.loadUnitTypes();
  }

  loadUnitTypes() {
    this.userService.fetchAllUnitTypes().subscribe(result => {
      this.unitTypes = result;
    });
  }

  loadMeals() {
    this.rows.clear();
    this.addMealForm.reset();
    this.imageArray = [];
    this.files = [];

    this.loading();
    this.dataSource = new MatTableDataSource();
    this.userService.fetchAllMeals().subscribe(newMeals => {
      Swal.close();
      let mealList = [];

      for (let meal of newMeals) {
        mealList.push({
          'id': meal.id,
          'image': meal.image,
          'name': meal.mealName,
          'category': meal.mealType,
          'price': meal.price,
          'ingredients': meal.mealIngredientsCollection[0].ingredientsName,
          'ingredientsList': meal.mealIngredientsCollection
        });
      }

      this.dataSource = new MatTableDataSource(mealList);
      this.dataSource.paginator = this.paginator;

    });
  }

  reactiveForm() {
    this.addMealForm = this._formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  get f() {
    return this.addMealForm.controls;
  }

  onSelect(event) {
    if (this.files.length <= 3 && event.addedFiles.length !== 0) {
      const ext = event.addedFiles[0].name.split('.').pop();
      if (ext === 'jpeg' || ext === 'png' || ext === 'jpg') {
        this.uploadImages(event.addedFiles);
        this.files.push(...event.addedFiles);
        if (event.addedFiles[0].size / 1024 / 1024 > 5) {
          this.files.splice(-1, 1);
        }
      }
    }
  }

  uploadImages(value) {
    this.loading();
    let formData = new FormData();
    formData.append('file', value[0]);

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict');

    let req = new HttpRequest('POST', environment.proxy + '/file/upload/', formData, {
      headers: headers,
      reportProgress: true,
    });
    this.http.request(req).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      last(),
      catchError((error: HttpErrorResponse) => {
        Swal.close();
        //Remove last image from files array
        this.files.splice(-1, 1);
        return of('upload failed.');
      })
    ).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          Swal.close();
          if (this.isUpdateMeal) {
            this.image = event.body.message;
          }
          this.imageArray.push({
            'event': value[0],
            'image': event.body.message
          });
        }
      }
    );
  }

  onRemove(event) {
    for (let image of this.imageArray) {
      if (image.event === event) {
        let index = this.imageArray.indexOf(image);
        if (index !== -1) {
          this.imageArray.splice(index, 1);
        }
        this.files.splice(this.files.indexOf(event), 1);
      }
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  submitMeal() {

    this.submitted = true;
    if (this.addMealForm.invalid) {
      return;
    }

    let imageURL;
    let temp = true;

    if (this.imageArray.length > 0 && temp) {
      for (let image of this.imageArray) {
        temp = false;
        imageURL = image.image;
      }
    }

    if (this.rows.value.length === 0) {
      this.requiredIngredients = true;
      return;
    }

    this.requiredIngredients = false;


    if (this.isUpdateMeal) {
      let body = {
        'id': this.selectMealId,
        'mealName': this.name,
        'price': parseFloat(this.price),
        'mealType': this.selectedCategory,
        'image': this.image,
        'mealIngredientsCollection': this.rows.value
      };
      this.loading();

      this.userService.updateMeal(body).subscribe(() => {
        if (this._removeIng.length > 0) {
          for (let id of this._removeIng) {
            this.userService.deleteIng(id).subscribe(() => {
            });
          }
        }

        Swal.close();
        this.rows.clear();
        this.addMealForm.reset();
        this.imageArray = [];
        this.files = [];

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Meal is updated!',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          this.loadMeals();
          this.clearIngId();
          document.getElementById('closeModal').click();
        });
      });
    } else {


      if (this.imageArray.length <= 0) {
        this.requiredImages = true;
        return;
      } else {
        this.requiredImages = false;
      }


      let body = {
        'mealName': this.name,
        'price': parseFloat(this.price),
        'mealType': this.selectedCategory,
        'image': imageURL,
        'mealIngredientsCollection': this.rows.value
      };
      this.loading();

      this.userService.saveMeal(body).subscribe(() => {
        Swal.close();
        this.rows.clear();
        this.addMealForm.reset();
        this.imageArray = [];
        this.files = [];
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Meal is added!',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          this.loadMeals();
          document.getElementById('closeModal').click();
        });
      });
    }


  }

  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  _removeIng = [];
  requiredImages: boolean = false;
  requiredIngredients: boolean = false;

  onRemoveRow(rowIndex: number) {
    if (this.rows.value[rowIndex].id !== undefined) {
      this._removeIng.push(this.rows.value[rowIndex].id);
    }

    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): FormGroup {
    return this._formBuilder.group({
      ingredientsName: null,
      unit: null,
      protein: null,
      carbs: null,
      fat: null,
      quantity: null
    });
  }

  deleteMeal(id: any) {
    this.loading();
    this.userService.deleteMeal(id).subscribe(() => {
      Swal.close();
      this.loadMeals()
    }, () => {
      Swal.close();
    });
  }

  editMeal(row: any, status: boolean) {
    this.addMealForm.get('name').clearValidators();
    this.addMealForm.get('name').updateValueAndValidity();

    this.addMealForm.get('price').clearValidators();
    this.addMealForm.get('price').updateValueAndValidity();

    this.addMealForm.get('category').clearValidators();
    this.addMealForm.get('category').updateValueAndValidity();

    this.isUpdateMeal = status;
    let arr = [];
    this.rows.clear();
    arr.push(row);
    for (let meal of arr) {
      this.selectMealId = meal.id;
      this.name = meal.name;
      this.image = meal.image;
      this.price = meal.price;
      this.selectedCategory = meal.category;
      for (let ingredient of meal.ingredientsList)

        this.rows.push(
          this._formBuilder.group({
            id: ingredient.id,
            ingredientsName: ingredient.ingredientsName,
            unit: ingredient.unit,
            protein: ingredient.protein,
            carbs: ingredient.carbs,
            fat: ingredient.fat,
            quantity: ingredient.quantity
          })
        );

    }
  }

  clearIngId() {
    this._removeIng = [];
  }

  clearForm() {
    this.isUpdateMeal = false;
    this.rows.clear();
    this.addMealForm.reset();
    this.imageArray = [];
    this.files = [];
    this.clearIngId();
  }

  alphaOnly(event) {
    const inputValue = event.charCode;
    if (!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) {
      event.preventDefault();
    }
  }
}

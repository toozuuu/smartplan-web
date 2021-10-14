import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  productDetails: any;
  email: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService
  ) {
    this.email = localStorage.getItem('$email');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.productDetails = JSON.parse(decodeURIComponent(params['data']));
    });
  }

  addToCart() {
    let body = [{
      "email": this.email,
      "unitPrice": this.productDetails.price,
      "quantity": 1,
      "mealId": {"id": this.productDetails.id}
    }];

    this.userService.createCart(body).subscribe((result) => {
      if (result.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Item added successfully!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
}

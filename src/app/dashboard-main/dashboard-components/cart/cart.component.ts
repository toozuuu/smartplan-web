import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  email: any;
  cartDetails: any;
  itemCount: number = 0;

  constructor(private userService: UserService,
              private router: Router
  ) {
    this
      .email = localStorage.getItem('$email');
  }

  ngOnInit()
    :
    void {
    this.loadCartItems();
  }


  loadCartItems() {
    this.userService.loadCart(this.email).subscribe(result => {
      this.cartDetails = result;
      this.itemCount = this.cartDetails.cartDTOList.length;
    });
  }

  deleteItem(id) {
    Swal.fire({
      title: 'Delete Item',
      icon: 'warning',
      text: 'Are you sure you want to delete this item?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.value) {
        this.userService.deleteCartItem(id).subscribe(() => {
          this.loadCartItems();
        });
      }
    });

  }

  checkout() {
    this.router.navigate(['/dashboard/checkout']);
  }
}

import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {InteractionService} from "../../../service/interaction.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  name: any;
  address: any;
  addressId: any;
  email: any;
  itemCount: number = 0;

  constructor(private userService: UserService,
              private interaction:InteractionService,
              private router: Router) {
    this.name = localStorage.getItem('$name');
    this.address = localStorage.getItem('$address_address');
    this.address = localStorage.getItem('$address_address');
    this.addressId = localStorage.getItem('$address_id');
    this.email = localStorage.getItem('$email');
    this.loadCartItems();
  }

  loadCartItems() {
    this.userService.loadCart(this.email).subscribe(result => {
      this.itemCount = result.cartDTOList.length;
    });
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
      'address': this.address
    }
    this.userService.updateAddress(addressBody).subscribe(result => {
      if (this.address !== result['address'] && result['address'] !== undefined) {
        this.address = result['address'];
        localStorage.setItem('$address_address', this.address);
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

  ngOnInit(): void {
    this.interaction._updateCart.subscribe(isUpdated => {
      if (isUpdated) {
        this.loadCartItems();
      }
    });
  }
}


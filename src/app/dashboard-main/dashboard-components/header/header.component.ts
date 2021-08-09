import {Component} from '@angular/core';
import Swal from "sweetalert2";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  name: any;
  address: any;
  addressId: any;

  constructor(private userService: UserService,
              private router: Router) {
    this.name = localStorage.getItem('$name');
    this.address = localStorage.getItem('$address_adrdess');
    this.address = localStorage.getItem('$address_adrdess');
    this.addressId = localStorage.getItem('$address_id');
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
}

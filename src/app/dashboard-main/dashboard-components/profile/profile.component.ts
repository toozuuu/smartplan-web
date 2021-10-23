import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  name: any;
  email: any;
  userId: any;
  address: any;
  addressId: any;
  age: any;
  gender: any;
  dailyReqOld: any;

  pendingOrderLength: number = 0;

  constructor(private userService: UserService) {
    this.userId = localStorage.getItem('$id');
    this.name = localStorage.getItem('$name');
    this.email = localStorage.getItem('$email');
    this.gender = localStorage.getItem('$gender');
    this.address = localStorage.getItem('$address_address');
    this.addressId = localStorage.getItem('$address_id');
    this.age = localStorage.getItem('$age');
    this.dailyReqOld = localStorage.getItem('$dailyReq');

  }

  ngOnInit(): void {
    this.fetchAllMyOrderDetails();
  }

  fetchAllMyOrderDetails() {
    this.userService.purchaseDetailsCountByUsername(localStorage.getItem('$email'), 'PENDING').subscribe(result => {
      this.pendingOrderLength = result.count;
    });
  }
}

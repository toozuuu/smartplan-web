import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderCount: number = 0;
  orderDetailList: any;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.fetchAllMyOrderDetails();
  }

  fetchAllMyOrderDetails() {
    this.userService.purchaseDetailsByUsername(localStorage.getItem('$email')).subscribe(orderDetails => {
      let arr = [];

      for (let order of orderDetails) {
        for(let temp of order.purchaseDetails){
          arr.push(temp);
        }
      }
      this.orderDetailList = arr;
      this.orderCount = arr.length;
    });
  }

  convertDate(created: any) {
    let date = new Date(new Date(created)),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join('-');
  }

  changeStatus(id) {
    Swal.fire({
      title: 'Order Delivery',
      icon: 'warning',
      text: 'Do you want to change your order status?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.userService.purchaseDetailUpdateStatus({
          'id': id,
          'status': 'DELIVERED'
        }).subscribe(() => {
          this.fetchAllMyOrderDetails();
        });
      }
    });

  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../../../service/user.service";
import Swal from "sweetalert2";
import {ReportService} from "../../../service/report.service";

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  displayedColumns: string[] = ['username', 'orderDate', 'name', 'type', 'qty', 'price', 'address', 'status', 'action'];
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService,
              private reportService: ReportService) {
  }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading();
    this.dataSource = new MatTableDataSource();
    this.userService.fetchAllOrders().subscribe(orderDetails => {
      let arr = [];
      let arrTemp = [];
      let username;
      let orderId;

      for (let order of orderDetails) {
        username = order.email;
        orderId = order.purchaseId;
        for (let temp of order.purchaseDetails) {
          arr.push(temp);
        }
      }

      for (let order of arr) {
        arrTemp.push({
          'orderId': orderId,
          'orderDetailsId': order.id,
          'username': username,
          'name': order?.mealId.mealName,
          'orderDate': this.convertDate(order?.orderDate),
          'type': order?.mealId.mealType,
          'qty': order?.quantity,
          'price': order?.price,
          'address': order?.shippingAddress,
          'image': order?.mealId.image,
          'status': order.status
        });
      }

      Swal.close();
      this.dataSource = new MatTableDataSource(arrTemp);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  convertDate(created: any) {
    let date = new Date(new Date(created)),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join('-');
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

  selectedOrderDetails: any;

  editUser(data) {
    this.selectedOrderDetails = data;
  }

  updateStatus(status) {
    this.userService.purchaseDetailUpdateStatus({
      'id': this.selectedOrderDetails.orderDetailsId,
      'status': status
    }).subscribe(() => {
      this.loadOrders();
    });
  }

  downloadExcel() {
    this.reportService.downloadOrderReport();
  }
}

import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.scss']
})
export class AdminSettingComponent implements OnInit {

  adminEmail: any;
  adminPassword: any;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadAdminDetails();
  }

  loadAdminDetails() {
    this.loading();
    this.userService.fetchAllAdminUser().subscribe(result => {
      Swal.close();
      this.adminEmail = result[0]['email'];
      this.adminPassword = result[0]['password'];
    });
  }

  updateAdminLoginDetails() {
    Swal.fire({
      title: 'Admin account details',
      icon: 'warning',
      text: 'Do you want to update your account details?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.value) {
        this.loading();
        this.userService.updateAdminDetails({'email':this.adminEmail,'password':this.adminPassword}).subscribe(result=>{
          Swal.close();
          if(result){
            Swal.fire({
              icon: 'success',
              title: 'Updated',
              text: 'Your account details have been updated!'
            })
          }
        },() => {
          Swal.close();
        });
      }
    });

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

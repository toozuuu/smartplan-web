import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";

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
    this.userService.fetchAllAdminUser().subscribe(result => {
      this.adminEmail = result[0]['email'];
      this.adminPassword = result[0]['password'];
    });
  }

  updateAdminLoginDetails() {
    this.userService.updateAdminDetails({'email':this.adminEmail,'password':this.adminPassword}).subscribe(result=>{

    });
  }
}

import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  isMeals: any = true;
  isUsers: any = false;
  isChat: any = false;
  isOrders: any = false;
  isUnitType: any = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
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


  clickMeals() {
    this.isMeals = true;
    this.isUsers = false;
    this.isChat = false;
    this.isOrders = false;
    this.isUnitType = false;

  }

  clickUsers() {
    this.isMeals = false;
    this.isUsers = true;
    this.isChat = false;
    this.isOrders = false;
    this.isUnitType = false;

  }

  clickSettings() {
    this.isMeals = false;
    this.isUsers = false;
    this.isChat = false;
    this.isOrders = false;
    this.isUnitType = false;

  }

  clickChat() {
    this.isMeals = false;
    this.isUsers = false;
    this.isChat = true;
    this.isOrders = false;
    this.isUnitType = false;

  }

  clickOrders() {
    this.isMeals = false;
    this.isUsers = false;
    this.isChat = false;
    this.isOrders = true;
    this.isUnitType = false;

  }

  clickUnitTypes() {
    this.isMeals = false;
    this.isUsers = false;
    this.isChat = false;
    this.isOrders = false;
    this.isUnitType = true;
  }
}

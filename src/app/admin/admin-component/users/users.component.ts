import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'gender', 'consulter', 'email', 'age', 'status', 'action'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading();
    this.dataSource = new MatTableDataSource();
    this.userService.fetchAllUsers().subscribe(userList => {
      Swal.close();
      let users = [];

      for (let user of userList) {
        users.push({
          'name': user.name,
          'gender': user.gender,
          'consulter': user.consulter,
          'email': user.email,
          'status': user.status,
          'age': user.age
        });
      }

      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;

    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  userDetails:any;

  editUser(data) {
    this.userDetails = data;
  }

  updateStatus(status){
    this.userService.updateUserStatus({
      'email': this.userDetails.email,
      'status': status
    }).subscribe(() => {
      this.loadUsers();
    });
  }

}

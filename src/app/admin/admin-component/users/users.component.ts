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
  displayedColumns: string[] = ['name', 'gender', 'consulter', 'email', 'password', 'age'];
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

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
          'password': user.password,
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
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../../../service/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-unit-type',
  templateUrl: './unit-type.component.html',
  styleUrls: ['./unit-type.component.scss']
})
export class UnitTypeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'description', 'action','action1'];
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadUnitTypes();
  }

  loadUnitTypes() {
    this.loading();
    this.dataSource = new MatTableDataSource();
    this.userService.fetchAllUnitTypes().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      Swal.close();
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

  description: any;
  id: any;

  editUnitType(data) {
    this.id = data.id;
    this.description = data.description;
  }


  saveOrUpdate(status) {
    this.loading();
    if (status === 'UPDATE') {
      this.userService.updateUnitType({'id': this.id, 'description': this.description}).subscribe(isUpdate => {
        if (isUpdate['success']) {
          Swal.close();
          this.description = undefined;
          this.id = undefined;
          this.loadUnitTypes();
        }
      });
    }
  }

  removeUnitType(id) {
    this.loading();
    this.userService.removeUnitType(id).subscribe(result=>{
      Swal.close();
      this.loadUnitTypes();
    });
  }
}

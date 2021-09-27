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

  displayedColumns: string[] = ['id', 'description', 'action'];
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
      Swal.close();
      this.dataSource = new MatTableDataSource(result);
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

  selectedUnitType:any;

  editUnitType(data) {
    this.selectedUnitType = data;
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  public href: string = "";
  public status = true;
  constructor(private router: Router) { }

  ngOnInit() {
    this.href = this.router.url;

    if (this.href == "/dashboard") {
      this.status = true;
    }
  }
}

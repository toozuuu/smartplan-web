import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  productDetails: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.productDetails = JSON.parse(params.data);
    });
  }

}

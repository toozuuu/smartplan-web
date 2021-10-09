import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {

  selectedItems: any;
  email: any;
  shippingAddress: any;
  mealId: any;
  address: any;
  total: any;

  checkoutAddress: any;
  comment: any;
  dailyReq: any;
  selectedDate: any;
  selectedTime: any;
  selectedOrderType: number = 1;
  orderTotal: any;
  forgetTotal: any;
  isDefaultAddress: boolean = true;
  isASAP: boolean = true;

  todayDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  constructor(private userService: UserService,
              private cdRef: ChangeDetectorRef,
              private router: Router) {
    this.email = localStorage.getItem('$email');
    this.loadCart();
  }

  ngOnInit() {

    this.dailyReq = localStorage.getItem('$dailyReq');

    this.address = localStorage.getItem('$address_address');
  }

  loadCart() {
    this.userService.loadCart(this.email).subscribe(result => {

      if (Object.keys(result).length === 0) {
        this.router.navigate(['/dashboard']);
      }

      this.selectedItems = result['cartDTOList'];
      this.total = result['totalPrice'];


      let temp = 0;

      for (let item of result['cartDTOList']) {
        for (let y of item['mealId'].mealIngredientsCollection) {
          temp = temp + y.protein * item.quantity;
        }
      }

      this.orderTotal = temp;

      if (this.dailyReq > this.orderTotal) {
        this.forgetTotal = this.dailyReq - this.orderTotal;
      } else {
        this.forgetTotal = this.dailyReq;
      }

    });
  }

  qtyUp(id, index, unitPrice, cartId) {
    let protein = (<HTMLInputElement>document.getElementById('protein' + index)).textContent;
    let inputField = (<HTMLInputElement>document.getElementById('qty' + index));
    let subTotal = (<HTMLInputElement>document.getElementById('showTotal' + index));
    inputField.value = String(parseInt(inputField.value) + 1);

    this.orderTotal = (this.orderTotal - parseFloat(protein)) + (parseFloat(protein) * parseFloat(inputField.value));

    subTotal.textContent = String(unitPrice * parseInt(inputField.value));

    this.commonCartUpdate(cartId, unitPrice, inputField.value);

  }

  qtyDown(id, index, unitPrice, cartId) {
    let protein = (<HTMLInputElement>document.getElementById('protein' + index)).textContent;

    let inputField = (<HTMLInputElement>document.getElementById('qty' + index));
    let subTotal = (<HTMLInputElement>document.getElementById('showTotal' + index));
    if (parseInt(inputField.value) > 1) {
      inputField.value = String(parseInt(inputField.value) - 1);
      this.orderTotal = (this.orderTotal - (parseFloat(protein) * parseFloat(inputField.value)));

      subTotal.textContent = String(unitPrice * parseInt(inputField.value));
    }

    this.commonCartUpdate(cartId, unitPrice, inputField.value);
  }


  commonCartUpdate(cartId, unitPrice, inputField) {
    let body = {
      'id': cartId,
      'email': this.email,
      'unitPrice': unitPrice,
      'quantity': parseInt(inputField)
    };

    this.userService.updateCart(body).subscribe(() => {
      this.loadCart();
    });
  }

  checkout() {

    let _orderType;
    let _orderDate;
    if (this.selectedOrderType === 1) {
      _orderType = 'ASAP';
      _orderDate = new Date();
    } else {
      _orderType = 'LATER';
      if (this.selectedDate === undefined || this.selectedTime === undefined) {
        return false;
      }
      _orderDate = this.convertDate(this.selectedDate['endDate']);
    }

    if (this.isDefaultAddress) {
      this.checkoutAddress = this.address;
    } else {
      this.checkoutAddress = this.shippingAddress;
    }

    this.loading();
    let purchaseDetails = [];
    let x = this.selectedItems.length;
    for (let i = 0; i < x; i++) {
      if (document.getElementById('showTotal' + i) !== null) {
        let subTotal = (<HTMLInputElement>document.getElementById('showTotal' + i));
        let inputField = (<HTMLInputElement>document.getElementById('qty' + i));
        let mealId = (<HTMLInputElement>document.getElementById('mealId' + i));
        purchaseDetails.push({
          'price': parseFloat(subTotal.textContent),
          'quantity': parseFloat(inputField.value),
          'shippingAddress': this.checkoutAddress,
          'comment': this.comment,
          'orderType': _orderType,
          'orderDate': _orderDate,
          'orderTime': this.selectedTime,
          'mealId': {
            'id': parseInt(mealId.textContent)
          }
        });
      }

    }

    let body = {
      'email': this.email,
      'purchaseDetails': purchaseDetails
    };

    if (this.dailyReq >= this.orderTotal) {
      this.userService.purchaseSave(body).subscribe(result => {
        Swal.close();

        if (result['success']) {
          if (this.selectedItems.length > 0) {
            for (let temp of this.selectedItems) {
              this.deleteSelectedItem(temp['id']);
            }
          }
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your order has been placed. Check your email for details.',
            showConfirmButton: false,
            timer: 2500
          }).then(() => {
            this.router.navigate(['/dashboard/orders']);
          });
        }

      }, () => {
        Swal.close();
      });
    } else {
      Swal.close();
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please maintaining daily required food calories.!',
        footer: 'Your daily calories limit is ' + this.dailyReq + ' kcal. But your order items\' total calories is ' + this.orderTotal + ' kcal.'
      })
    }

  }

  convertDate(created: any) {
    let date = new Date(new Date(created)),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
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

  deleteSelectedItem(id: any) {
    this.userService.deleteCartItem(id).subscribe(() => {
      this.loadCart();
    });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  shippingOrderNeed(number: number) {
    this.selectedOrderType = number;
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  manageProtein(protein: any) {
    let temp = 0;
    if (protein.length > 0) {
      for (let pro of protein) {
        temp = temp + pro.protein;
      }
      return temp;
    }
  }
}

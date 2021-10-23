import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  _updateCheckOut = new Subject<boolean>();

  _updateCart = new Subject<boolean>();

  constructor() {
  }

  passSelectedData(message: any) {
    this._updateCheckOut.next(message);
  }

  callToUpdateCart(message: any) {
    this._updateCart.next(message);
  }

}

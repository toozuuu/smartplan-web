import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private _updateCheckOut = new Subject<boolean>();

  constructor() {
  }

  passSelectedData(message: any) {
    this._updateCheckOut.next(message);
  }

}

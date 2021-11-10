import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PROXY: string;

  constructor(private http: HttpClient) {
    this.PROXY = environment.proxy;
  }

  createCart(body): Observable<any> {
    return this.http.post<any>(this.PROXY + '/cart/save', body);
  }

  checkDailyGoal(email): Observable<any> {
    return this.http.get<any>(this.PROXY + '/user/checkDailyStatus/'+email);
  }

  checkToDoDailyGoal(body): Observable<any> {
    return this.http.post<any>(this.PROXY + '/user/daily/checkToDo',body);
  }

  updateCart(body): Observable<any> {
    return this.http.post<any>(this.PROXY + '/cart/update', body);
  }

  loadCart(email): Observable<any> {
    return this.http.get<any>(this.PROXY + '/cart/getByUser/' + email);
  }

  deleteCartItem(id): Observable<any> {
    return this.http.delete<any>(this.PROXY + '/cart/delete/' + id);
  }

  loginIn(body): Observable<any> {
    return this.http.post<any>(this.PROXY + '/user/login', body);
  }

  loginUp(body): Observable<any> {
    return this.http.post<any>(this.PROXY + '/user/register', body);
  }

  isExistEmail(email): Observable<any> {
    return this.http.get<any>(this.PROXY + '/user/checkEmail/' + email);
  }

  fetchMealsByUserId(id): Observable<any> {
    return this.http.get<any>(this.PROXY + '/meal/preAndPost/' + id);
  }

  fetchAllMeals(): Observable<any> {
    return this.http.get<any>(this.PROXY + '/meal/all');
  }

  fetchAllUsers(): Observable<any> {
    return this.http.get<any>(this.PROXY + '/user/getAll');
  }

  purchaseSave(body): Observable<any> {
    return this.http.post<any>(this.PROXY + '/purchase/save', body);
  }

  purchaseDetailUpdateStatus(body): Observable<any> {
    return this.http.post<any>(this.PROXY + '/purchase/updateOrderStatus', body);
  }

  purchaseDetailsByUsername(username): Observable<any> {
    return this.http.get<any>(this.PROXY + '/purchase/getOrdersByUser/' + username);
  }

  purchaseDetailsCountByUsername(username, status): Observable<any> {
    return this.http.get<any>(this.PROXY + '/purchase/getCount/' + username + '/' + status);
  }

  saveMeal(body): Observable<any> {
    return this.http.post<any>(this.PROXY + '/meal/save', body);
  }

  updateMeal(body): Observable<any> {
    return this.http.post<any>(this.PROXY + '/meal/update', body);
  }

  deleteMeal(id): Observable<any> {
    return this.http.delete<any>(this.PROXY + '/meal/delete/' + id);
  }

  deleteIng(id): Observable<any> {
    return this.http.delete<any>(this.PROXY + '/meal/ing/delete/' + id);
  }

  updateAddress(body): Observable<any> {
    return this.http.post<any>(this.PROXY + '/user/updateAddress', body);
  }

  updateUserPlan(body): Observable<any> {
    return this.http.post<any>(this.PROXY + '/user/update', body);
  }

  updateUserStatus(body): Observable<any> {
    return this.http.post<any>(this.PROXY + '/user/updateUserStatus', body)
  }

  fetchAllOrders(): Observable<any> {
    return this.http.get<any>(this.PROXY + '/purchase/getOrders')
  }

  fetchAllUnitTypes(): Observable<any> {
    return this.http.get<any>(this.PROXY + '/unitType/all')
  }

  updateUnitType(body): Observable<any> {
    return this.http.post<any>(this.PROXY + '/unitType/update', body)
  }

  saveUnitType(body): Observable<any> {
    return this.http.post<any>(this.PROXY + '/unitType/save', body)
  }

  removeUnitType(id): Observable<any> {
    return this.http.delete<any>(this.PROXY + '/unitType/delete/' + id)
  }
}

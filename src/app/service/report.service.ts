import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {saveAs} from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  PROXY: string;

  constructor(private http: HttpClient) {
    this.PROXY = environment.proxy;
  }

  downloadMealReport(): any {
    return this.http.get(this.PROXY + '/meal/generateExcel/report', {responseType: 'blob'})
      .subscribe(res => {
        const blob = new Blob([res], {type: res.type});
        saveAs(blob, 'meals.xls');
      }, () => {
        alert('Sorry file not available!');
      });
  }

  downloadOrderReport(): any {
    return this.http.get(this.PROXY + '/purchase/generateExcel/report', {responseType: 'blob'})
      .subscribe(res => {
        const blob = new Blob([res], {type: res.type});
        saveAs(blob, 'orders.xls');
      }, () => {
        alert('Sorry file not available!');
      });
  }

  downloadUserReport(): any {
    return this.http.get(this.PROXY + '/user/generateExcel/report', {responseType: 'blob'})
      .subscribe(res => {
        const blob = new Blob([res], {type: res.type});
        saveAs(blob, 'users.xls');
      }, () => {
        alert('Sorry file not available!');
      });
  }
}

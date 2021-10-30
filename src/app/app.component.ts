import {Component} from '@angular/core';
import {BnNgIdleService} from "bn-ng-idle";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private bnIdle: BnNgIdleService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        let login = localStorage.getItem('$LOG');
        let userRole = localStorage.getItem('USER_ROLE');

        if (login === 'LOGGED' && userRole === 'USER') {
          localStorage.clear();
          this.router.navigate(['/']);
          console.log('session expired');
        }
      }
    });
  }

}

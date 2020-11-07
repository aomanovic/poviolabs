import {Component, OnDestroy} from '@angular/core';
import {Actions, ofActionSuccessful} from '@ngxs/store';
import {RouterDataResolved} from '@ngxs/router-plugin';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'cryptotracker';
  private destroy$ = new Subject<void>();

  constructor(actions$: Actions) {
    actions$.pipe(
      ofActionSuccessful(RouterDataResolved),
      takeUntil(this.destroy$)
    ).subscribe((action: RouterDataResolved) => {
      console.log(action);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

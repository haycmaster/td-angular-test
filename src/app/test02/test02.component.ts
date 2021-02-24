import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-test02',
  templateUrl: './test02.component.html',
  styleUrls: ['./test02.component.scss']
})
export class Test02Component implements OnInit, OnDestroy {
  @ViewChild('messageDiv', {static: false}) msgDiv;
  
  subAmount: Subscription;

  valid$ = new BehaviorSubject<boolean>(true);
  btnLabel$ = new BehaviorSubject<string>('Send');
  message$ = new BehaviorSubject<string>(null);

  form = this.formBuilder.group({
    amount: [null, [Validators.required]],
    frequency: ['1', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initObservable();
  }

  ngOnDestroy() {
    // NOTE: Prevent memory leak
    this.subAmount.unsubscribe();
  }

  initObservable() {
    this.subAmount = 
    this.form.controls.amount.valueChanges
      .subscribe(
        amount => 
          {
            this.btnLabel$.next(
              !!amount ?
                'Send $' + (+amount).toFixed(2)
              : 'Send'
            );
            this.valid$.next(!!amount);
          }
      );
  }

  submitForm() {
    const fm = this.form.getRawValue();
    if (!fm.amount) {
      this.valid$.next(!!fm.amount);
      this.message$.next(null);
    } else {
      this.message$.next(
        '$' + fm.amount + ' sent to Smith.  (#messageDiv get focused, so screen reader will read the text)'
      );

      // NOTE: set #messageDiv get focus, so screen read will read the text
      //       but access DOM elements directly will impact the performance
      (this.msgDiv.nativeElement as HTMLInputElement).focus();
    }
  }
}

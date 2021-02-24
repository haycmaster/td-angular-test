import { Component } from '@angular/core';
import { BehaviorSubject, of, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-test03',
  templateUrl: './test03.component.html',
  styleUrls: ['./test03.component.scss']
})
export class Test03Component {
  msgSub: Subscription;
  messageList$ = new BehaviorSubject<string[]>([]);
  title = 'toast-notification';
  sourceList = [
    'You got a message?',
    'Oops, looks like you got another message',
    'You got a new toast!',
    'Ever thought about getting a new toaster?'
  ];
  messageList = [];

  constructor() {
  }

  onClick() {
    const index = this.messageList.length;
    this.messageList.push(this.sourceList[index]);

    setTimeout(() => {
      this.messageList.shift();
    }, 5000);
  }
}

import {Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-chat-input',
  template: `
    <textarea class="chat-input-text" placeholder="Type message..."
              #message (keydown.enter)="onSubmit()" (keyup.enter)="message.value = ''"
              (keyup.escape)="dismiss.emit()"></textarea>
    <button type="submit" class="chat-input-submit" (click)="onSubmit()">
      {{buttonText}}
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./chat-input.component.css'],
})
export class ChatInputComponent {

  @Input() public buttonText = '↩︎';
  @Input() public focus = new EventEmitter();
  @Output() public send = new EventEmitter();
  @Output() public imageRes = new EventEmitter();
  @Output() public dismiss = new EventEmitter();
  @ViewChild('message', {static: true}) message: ElementRef;
  sender: any;

  constructor() {
    this.focus.subscribe(() => this.focusMessage());
  }

  public focusMessage() {
    this.message.nativeElement.focus();
  }

  public getMessage() {
    return this.message.nativeElement.value;
  }

  public clearMessage() {
    this.message.nativeElement.value = '';
  }

  onSubmit() {
    const message = this.getMessage();
    if (message.trim() === '') {
      return;
    }
    this.send.emit({message});
    this.clearMessage();
    this.focusMessage();
  }

}

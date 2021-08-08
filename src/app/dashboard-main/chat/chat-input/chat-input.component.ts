import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import {ChatWidgetComponent} from '..';
import {ChatService} from "../../../service/chat.service";

@Component({
  selector: 'app-chat-input',
  template: `
    <textarea class="chat-input-text" placeholder="Type message..."
              #message (keydown.enter)="onSubmit()" (keyup.enter)="message.value = ''" (keyup.escape)="dismiss.emit()"></textarea>
    <label for="file-upload" class="custom-file-upload"></label>
    <input id="file-upload" type="file" (change)="onFileSelected($event.target.files)" />
    <button type="submit" class="chat-input-submit" (click)="onSubmit()">
      {{buttonText}}
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./chat-input.component.css'],
})
export class ChatInputComponent implements OnInit {
  @Input() public buttonText = '↩︎';
  @Input() public focus = new EventEmitter();
  @Output() public send = new EventEmitter();
  @Output() public imageRes = new EventEmitter();
  @Output() public dismiss = new EventEmitter();
  // @ts-ignore
  @ViewChild('message') message: ElementRef;
  selectedFile = null;
  sender: any;
  constructor(private service: ChatService,private chatWindow: ChatWidgetComponent) {}

  ngOnInit() {
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
    this.send.emit({ message });
    this.clearMessage();
    this.focusMessage();
  }
  onFileSelected(files) {
    this.selectedFile = files[0];
    const body = new FormData();
    body.append('image', this.selectedFile, this.selectedFile.name);
    this.service.imageUpload(body).subscribe(result => {
      this.chatWindow.imageRes(result,this.selectedFile.name);
    });
  }
}

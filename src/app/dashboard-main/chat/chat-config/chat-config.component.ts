import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-chat-config',
  template: `

  `,
  styles: [`

  `],
})
export class ChatConfigComponent {
  @Input() public theme: string;
  @Input() public text = 'Select theme';
  @Output() public themeChange: EventEmitter<any> = new EventEmitter();
}

import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {fadeIn, fadeInOut} from '../animations';
import Swal from 'sweetalert2';
import {ChatService} from "../../../service/chat.service";


@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  animations: [fadeInOut, fadeIn],
})
export class ChatWidgetComponent implements OnInit {

  @ViewChild('bottom', {static: true}) bottom: ElementRef;
  @Input() public theme: 'blue' | 'grey' | 'red' = 'grey';

  public _visible = false;
  id: any;
  message: any;
  url: any;
  name: any;
  state: any;
  sender: any;
  status: any;
  time: any;
  username: any;
  chatroomid: any;
  notificationCount: any = 0;
  result: any;
  isLog: any;


  constructor(private service: ChatService) {
    this.username = "sachindilshan040@gmail.com"
    setInterval(() => {
      this.randomMessage();
    }, 3000);
  }

  ngOnInit() {
    this.isLog = localStorage.getItem('$LOG');
    setTimeout(() => this.visible = true, 1000);
    if (this.isLog === 'LOGGED') {
      this.visible = !this.visible;
      this.sendMessage({
        'message': this.result
      });
    } else {
      Swal.close();
      Swal.fire({
        position: 'center',
        title: 'Please Login First!',
        showConfirmButton: false,
        timer: 1500
      });
    }

  }


  public get visible() {
    return this._visible;
  }


  @Input()
  public set visible(visible) {
    this._visible = visible;
    if (this._visible) {
      setTimeout(() => {
        this.scrollToBottom();
        this.focusMessage();
      }, 0);
    }
  }

  public focus = new Subject();

  public operator = {
    name: 'SmartPlan',
    status: 'online'
  };

  public client = {
    name: 'User',
    status: 'online'
  };

  public messages = [];
  image: any;

  public addMessage(from, text, img, type: 'received' | 'sent', date) {
    this.messages.unshift({
      from,
      text,
      img,
      type,
      date: date,
    });
    this.scrollToBottom();
  }

  public scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView();
    }
  }

  public focusMessage() {
    this.focus.next(true);
  }

  // message sent
  public sendMessage(message) {
    if (message === '' || message === undefined) {
      return;
    }

    if (this.isLog === 'LOGGED') {
      this.username = 'TEST_USERNAME';
      localStorage.setItem('LOGGED_USERNAME', this.username);

      let body = {
        'sender': this.username,
        'content': message.message,
        'receiver': 'ADMIN',
      };
      this.service.chat(body).subscribe(() => {
      });
      this.addMessage(this.client, message.message, '', 'sent', new Date().getTime());
      setTimeout(() => this.randomMessage(), 1000);
    } else {
      Swal.close();
      Swal.fire({
        position: 'center',
        title: 'Please Login First!',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  // message received
  randomMessage() {
    this.service.getSenderId(this.username).subscribe(result => {
      if (Object.keys(result).length > 0) {
        this.chatroomid = result[0].chatRoomId;
        this.service.getMessages(this.chatroomid).subscribe(getMessage => {
          if (this.messages.length - 1 !== Object.keys(getMessage).length) {
            this.messages = [];
            this.notificationCount = 0;
            this.addMessage(this.operator, 'Hi, how can we help you?', '', 'received', new Date().getTime());
            if (getMessage != null) {
              for (let msg of getMessage) {

                if (msg.sender === 'ADMIN') {
                  if (msg.status === 'NEW') {
                    this.notificationCount++;
                  }

                  this.addMessage(this.operator, msg.content, '', 'received', msg.time);
                } else {
                  this.addMessage(this.client, msg.content, '', 'sent', msg.time);
                }
              }
            }
          }
        });
      }

    });
  }

  public toggleChat() {

    this.visible = !this.visible;

    if (!this.visible) {
      this.notificationCount = 0;

      if (this.isLog === 'LOGGED') {
        if (this.username == null) {
          this.username = "TEXT_USERNAME";
          this.randomMessage();
        } else {
          this.randomMessage();
        }
      } else {
        this.messages = [];
        this.addMessage(this.operator, 'Hi, how can we help you?', '', 'received', new Date().getTime());
      }
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage();
    }

  }

}

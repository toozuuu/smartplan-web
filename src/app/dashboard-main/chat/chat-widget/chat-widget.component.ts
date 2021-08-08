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

  @ViewChild('bottom',{static:true}) bottom: ElementRef;
  @Input() public theme: 'blue' | 'grey' | 'red' = 'grey';

  public _visible = false;
  tenantValue: any;
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


  constructor(private service: ChatService) {
    setInterval(() => {
      this.randomMessage();
    }, 3000);
  }

  ngOnInit() {
    // this.tenantValue = localStorage.getItem('TENANT_VALUE');
    // setTimeout(() => this.visible = true, 1000);
    // this.interactionService.contactSeller.subscribe(result => {
    //   let isLoggedIn = localStorage.getItem('isLogged');
    //
    //   if (isLoggedIn === 'True') {
    //     this.visible = !this.visible;
    //     this.sendMessage({
    //       'message': result
    //     });
    //   } else {
    //     Swal.close();
    //     Swal.fire({
    //       position: 'center',
    //       type: 'warning',
    //       title: 'Please Login First!',
    //       showConfirmButton: false,
    //       timer: 1500
    //     });
    //   }
    //
    // });
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
    name: 'Brision',
    status: 'online'
  };

  public client = {
    name: 'User',
    status: 'online'
  };

  public messages = [];
  image: any;
  imageUrl: any;

  public addMessage(from, text, img, type: 'received' | 'sent', date) {
    this.messages.unshift({
      from,
      text,
      img,
      type,
      date: date,
    });
    // date: new Date().getTime(),
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

    let isLoggedIn = localStorage.getItem('isLogged');

    // if (isLoggedIn === 'True') {
    //   this.userRoleService.whoAmI().subscribe(whoAmIDetails => {
    //     this.username = whoAmIDetails.email;
    //     localStorage.setItem('LOGGED_USERNAME', this.username);
    //
    //     let body = {
    //       'sender': this.username,
    //       'content': message.message,
    //       'receiver': 'ADMIN',
    //     };
    //     this.service.chat(body).subscribe(() => {
    //     }, () => {
    //     });
    //   }, () => {
    //     Swal.close();
    //   });
    //   this.addMessage(this.client, message.message, '', 'sent', new Date().getTime());
    //   setTimeout(() => this.randomMessage(), 1000);
    // } else {
    //   Swal.close();
    //   Swal.fire({
    //     position: 'center',
    //     type: 'warning',
    //     title: 'Please Login First!',
    //     showConfirmButton: false,
    //     timer: 1500
    //   }).then(() => {
    //   });
    // }
  }

  // message received
  public randomMessage() {
    // this.service.getSenderId(this.username).subscribe(result => {
    //   if (Object.keys(result).length > 0) {
    //     this.chatroomid = result[0].chatRoomId;
    //     this.service.getMessages(this.chatroomid).subscribe(getMessage => {
    //       if (this.messages.length - 1 !== Object.keys(getMessage).length) {
    //         // this.notificationCount = ((Object.keys(getMessage).length) - (this.messages.length - 1));
    //         this.messages = [];
    //         this.notificationCount = 0;
    //         this.addMessage(this.operator, 'Hi, how can we help you?', '', 'received', new Date().getTime());
    //         if (getMessage != null) {
    //           for (let msg of getMessage) {
    //
    //             if (msg.sender === 'ADMIN') {
    //               if(msg.status==='NEW'){
    //                 this.notificationCount ++;
    //               }
    //
    //               this.addMessage(this.operator, msg.content, '', 'received', msg.time);
    //             } else {
    //               this.addMessage(this.client, msg.content, '', 'sent', msg.time);
    //             }
    //           }
    //         }
    //       }
    //     });
    //   }
    //
    // });
  }

  // public randomMessage(message) {
  //
  //   let isLoggedIn = localStorage.getItem('isLogged');
  //
  //   if (isLoggedIn === 'True') {
  //     this.userRoleService.whoAmI().subscribe(whoAmIDetails => {
  //       this.username = whoAmIDetails.email;
  //       console.log(whoAmIDetails);
  //
  //       let body = {
  //         'userName': whoAmIDetails.email,
  //         'chatMessageId': this.tenantValue,
  //         'content': this.message,
  //         'url': this.url,
  //         'sender': this.name,
  //         'receiver': this.receiver,
  //         'status': this.operator,
  //         'time': this.time,
  //         'deliveredTime': this.deliveredTime
  //       };
  //       this.service.chat(body).subscribe(result => {
  //         this.addMessage(this.operator, result[0].text, '', 'received');
  //         console.log('saved sucessfully');
  //
  //       }, () => {
  //       });
  //     }, () => {
  //       Swal.close();
  //     });
  //   }
  //   this.getMessages();
  // }

  getMessages() {
    this.service.getSenderId(this.sender).subscribe(result => {
      this.chatroomid = result.chatRoomId;
    });

    this.service.getMessages(this.chatroomid).subscribe(messages => {
    });
  }


  setAsDeliveredMessages(chatRoomID, sender) {
    // this.coreService.setAsDeliveredByChatRoomId(chatRoomID, sender).subscribe(() => {
    // });
  }


  public toggleChat() {

    this.visible = !this.visible;

    if (!this.visible) {
      this.notificationCount = 0;
      let isLoggedIn = localStorage.getItem('isLogged');

      if (isLoggedIn === 'True') {
        this.username = localStorage.getItem('LOGGED_USERNAME');
        if (this.username == null) {
          // this.userRoleService.whoAmI().subscribe(whoAmIDetails => {
          //   this.username = whoAmIDetails.email;
          //   localStorage.setItem('LOGGED_USERNAME', this.username);
          //
          //   this.randomMessage();
          // });
        } else {
          this.randomMessage();
        }
        if(this.chatroomid !== undefined && this.chatroomid !== null){
          this.setAsDeliveredMessages(this.chatroomid, 'ADMIN');
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
    if (event.key === '?' && !this._visible) {
      // this.toggleChat();
    }

  }

  imageRes(message, file) {
    this.imageUrl = 'http://127.0.0.1:5000/uploads/' + file;
    this.addMessage(this.operator, '', this.imageUrl, 'sent', new Date().getTime());

    setTimeout(() => {
      this.addMessage(this.operator, message, '', 'received', new Date().getTime());
    }, 1000);
  }
}

import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../../service/chat.service";

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {


  msgTab = 1;
  activeChat = 20;
  isUserSelected = false;

  chatRoomList: any;
  chatMessagesList: any;
  chatName: any;
  displayedChatName: any;
  displayedImageUrl: any;
  message: any;
  selectedChatRoomId: any;
  selectedUserLastMsgTime: any;


  userName: any;
  uName: any;

  type: any;
  userType: any;

  landUnit: any;
  natureOfCultivation: any;
  name: any;


  firstName: any;
  lastName: any;
  cityName: any;
  state: any;
  postalCode: any;


  constructor(private chatService: ChatService) {
    this.loadChatList();
  }

  ngOnInit() {
    setInterval(() => {
      this.loadChatList();
    }, 3000);
  }

  loadChatList() {
    this.chatService.getChatRoomList("ADMIN").subscribe(result => {
      this.chatRoomList = result;
    });
  }

  sendMessageClick() {
    if (this.message !== undefined && this.message !== null) {
      let body = {
        'chatRoomId': this.selectedRoom.chatRoomId,
        'sender': 'ADMIN',
        'content': this.message,
        'receiver': this.selectedRoom.sender,
      };
      this.chatService.chat(body).subscribe(() => {
        this.message = undefined;
        this.loadChatMessagesList(this.selectedRoom.chatRoomId);
      });
    }
  }

  selectedRoom: any;

  chatRoomClick(room: any, i: number) {
    this.activeChat = i;
    this.selectedRoom = room;
    this.isUserSelected = true;
    this.loadChatMessagesList(room.chatRoomId);
  }

  loadChatMessagesList(id) {
    this.chatService.getChatMessagesList(id).subscribe(result => {
      this.chatMessagesList = result;
    });
  }
}

import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  imageUpload(body): Observable<any> {
    // @ts-ignore
    return this.http.post<any>('http://127.0.0.1:5000/image/', body,{ responseType: 'text'});
  }

  chat(body): Observable<any> {
    // return this.http.post<any>(this.mainUrl.MAIN_URL_CHAT + '/chat/save', body);
    return;
  }

  getSenderId(sender): Observable<any> {
    // return this.http.get<any>(this.mainUrl.MAIN_URL_CHAT + '/chat/fetchChatRoomList/' + sender);
    return;

  }

  getMessages(chatRoomId): Observable<any> {
    // return this.http.get<any>(this.mainUrl.MAIN_URL_CHAT + '/chat/fetchMessagesByChatRoomId/' + chatRoomId);
    return;

  }

  getChatRoomList(sender) {
    // return this.http.get<any>( this.mainUrl.MAIN_URL_CHAT +'/chat/fetchChatRoomList/' + sender);
    return;

  }

  getChatMessagesList(chatRoomId) {
    // return this.http.get<any>( this.mainUrl.MAIN_URL_CHAT +'/chat/fetchMessagesByChatRoomId/' + chatRoomId);
    return;

  }
}

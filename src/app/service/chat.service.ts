import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  PROXY: string;

  constructor(private http: HttpClient) {
    this.PROXY = environment.proxy;

  }

  imageUpload(body): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:5000/image/', body, {responseType: 'json'});
  }

  chat(body): Observable<any> {
    return this.http.post<any>(this.PROXY + '/chat/save', body);
  }

  getSenderId(sender): Observable<any> {
    return this.http.get<any>(this.PROXY + '/chat/fetchChatRoomList/' + sender);

  }

  getMessages(chatRoomId): Observable<any> {
    return this.http.get<any>(this.PROXY + '/chat/fetchMessagesByChatRoomId/' + chatRoomId);

  }

  getChatRoomList(sender) {
    return this.http.get<any>(this.PROXY + '/chat/fetchChatRoomList/' + sender);

  }

  getChatMessagesList(chatRoomId) {
    return this.http.get<any>(this.PROXY + '/chat/fetchMessagesByChatRoomId/' + chatRoomId);

  }
}

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io('http://localhost:3000');

  constructor() { }

  msgData() {
    let observable = new Observable<any>(observer => {
      this.socket.on('msgData', (data) => {
        observer.next(data)
      })
      return () => { this.socket.disconnect(); }
    })
    return observable;
  }

  newMsgData() {
    let observable = new Observable<any>(observer => {
      this.socket.on('newMsgData', (data) => {
        observer.next(data)
      })
      return () => { this.socket.disconnect(); }
    })
    return observable;
  }

  newUserJoined() {
    let observable = new Observable<any>(observer => {
      this.socket.on('newUserJoined', (data) => {
        observer.next(data)
      })
      return () => { this.socket.disconnect(); }
    })
    return observable;
  }

  userLeave() {
    let observable = new Observable<any>(observer => {
      this.socket.on('userLeave', (data) => {
        observer.next(data)
      })
      return () => { this.socket.disconnect(); }
    })
    return observable;
  }

  joinChannel(data){
    this.socket.emit('joinChannel', data);
  }

  leaveChannel(data){
    this.socket.emit('leaveChannel', data);
  }

  sendMsg(data){
    this.socket.emit('sendMsg', data);
  }

}

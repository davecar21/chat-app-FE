import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { environment as ENV } from '@ENV';
import { ChatService } from './chat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollMsg') scrollMsg: ElementRef;
  userName;
  channelData = 'general';
  msgData;
  chatMsg;
  newUserMsg: any;

  isJoin = false;

  constructor(private chatService: ChatService) {
    console.log('BUILD:' + ENV.envName);

    this.chatService.msgData().subscribe(data => {
      this.msgData = data;
    })

    this.chatService.newMsgData().subscribe(
      data => {
        this.msgData.push(data);
        this.scrollBot();
      },
      error => {
        console.log(error)
      }
    )
    this.chatService.newUserJoined().subscribe(
      data => {
        // this.newUserMsg = data;
        this.msgData.push(data);
        this.scrollBot();
      },
      error => {
        console.log(error)
      })
    this.chatService.userLeave().subscribe(
      data => {
        // this.newUserMsg = data;
        this.msgData.push(data);
        this.scrollBot();
      },
      error => {
        console.log(error)
      }
    )

  }

  ngOnInit() { }

  ngAfterViewInit() {
  }

  scrollBot() {
    this.scrollMsg.nativeElement.scrollTop = this.scrollMsg.nativeElement.scrollHeight;
  }


  joinChannel() {
    console.log(this.userName);
    this.isJoin = true;
    this.chatService.joinChannel({ username: this.userName, channel: this.channelData })
  }

  leaveChannel() {
    console.log(this.userName);
    this.isJoin = false;
    this.chatService.leaveChannel({ username: this.userName, channel: this.channelData })
  }

  sendMsg() {
    this.chatService.sendMsg({ username: this.userName, message: this.chatMsg })
    console.log(this.chatMsg);
  }
}

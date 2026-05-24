import { Component, OnInit } from '@angular/core';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';
@Component({
  selector: 'app-chat-bot',
  imports: [],
  templateUrl: './chat-bot.html',
  styleUrl: './chat-bot.scss',
})
export class ChatBot implements OnInit {
  ngOnInit(): void {
    createChat({
      webhookUrl: 'https://n8n.srv1251456.hstgr.cloud/webhook/00911e7e-ea92-4f08-920c-6bf0a20bcb4f/chat'
    });
    // try1(){
    //   while(webhookUrl != 'ready')

    // }
  }
}

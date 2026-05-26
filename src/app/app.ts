import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostsList } from './component/posts-list/posts-list';
import { CompaniesList } from './component/companies-list/companies-list';
import { UnconfirmedPosts } from './component/unconfirmed-posts/unconfirmed-posts';
import { Nav } from "./component/nav/nav";
import { AddCustomer } from './component/add-customer/add-customer';
import { CreateCustomer } from './component/create-customer/create-customer';
import { TestComponent } from './component/test-component/test-component';
import { Tests } from './model/Tests';
import { ResultsComponent } from './component/results-component/results-component';
import { LoginComponent } from './component/login.component/login.component';
import { dashboard } from "./component/dashboard/dashboard";
import {  ChatBot } from './component/chat-bot/chat-bot';
import { CvChatComponent } from './component/cv-chat-component/cv-chat-component';
import { HasavaComponent } from './component/hasava-component/hasava-component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HasavaComponent, RouterOutlet, PostsList, CvChatComponent, UnconfirmedPosts, Nav,dashboard, CompaniesList, AddCustomer, CreateCustomer, TestComponent, ResultsComponent, LoginComponent, dashboard, ChatBot],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('blank-app');
  
}


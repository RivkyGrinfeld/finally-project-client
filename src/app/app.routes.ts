import { Routes } from '@angular/router';
import { PostsList } from './component/posts-list/posts-list';
import { UnconfirmedPosts } from './component/unconfirmed-posts/unconfirmed-posts';
import { CompaniesList } from './component/companies-list/companies-list';
import { CreateCustomer } from './component/create-customer/create-customer';
import { LoginComponent } from './component/login.component/login.component';
import { TestComponent } from './component/test-component/test-component';
import { dashboard } from './component/dashboard/dashboard';
import { HasavaComponent } from './component/hasava-component/hasava-component';
import { CvChatComponent } from './component/cv-chat-component/cv-chat-component';
import { ProPaymentComponent } from './component/pro-payment/pro-payment';
import { LandingComponent } from './component/landing/landing';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'PostList', component: PostsList },
    { path: 'PostToConfirm', component: UnconfirmedPosts },
    { path: 'Companies', component: CompaniesList },
    { path: 'Create-customer', component: CreateCustomer },
    { path: 'Login', component: LoginComponent },
    { path: 'Test', component: TestComponent },
    { path: 'dashboard', component: dashboard },
    { path: 'hasava', component: HasavaComponent },
    { path: 'Koch', component: CvChatComponent },
    { path: 'ProPayment', component: ProPaymentComponent },
];

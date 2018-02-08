import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { AppComponent }  from './app.component';

import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { OrderdetailService} from './service/orderdetail.service';
import { OrdersComponent } from './orders/orders.component';
// import { OrderlistComponent } from './orderlist/orderlist.component';
// import { OrderlistService} from './service/orderlist.service';
import { LoginComponent }  from './login/login.component';
import { LoginService} from './service/login.service';
import { PageService} from './service/page.service';
import { LoginoutService} from './service/loginout.service';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElModule } from 'element-angular';

//路由配置方法
export const ROUTES : Routes =[
  {path: '', pathMatch:'full', redirectTo:'login'}, //默认访问页面
  {path :'login', component:LoginComponent},
  // {path :'orderlist', component:OrderlistComponent},
  {path :'orders', component:OrdersComponent},
  {path :'orderdetail', component:OrderdetailComponent},
  
]
//引用文件
@NgModule({
  imports: [
    BrowserModule, 
    FormsModule, 
    BrowserAnimationsModule,
    ElModule.forRoot(),
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [
    AppComponent, 
    LoginComponent, 
    // OrderlistComponent,
    OrdersComponent,
    OrderdetailComponent
  ],
  providers: [OrderdetailService,PageService,LoginService,LoginoutService],
  bootstrap: [AppComponent]
 
})

export class AppModule { }

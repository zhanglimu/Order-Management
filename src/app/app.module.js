"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var orderdetail_component_1 = require("./orderdetail/orderdetail.component");
var orders_component_1 = require("./orders/orders.component");
var orderlist_component_1 = require("./orderlist/orderlist.component");
var login_component_1 = require("./login/login.component");
var http_component_1 = require("./http/http.component");
var http_service_1 = require("./service/http.service");
var router_1 = require("@angular/router");
//路由配置方法
exports.ROUTES = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'http', component: http_component_1.HttpComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'orderlist', component: orderlist_component_1.OrderlistComponent },
    { path: 'orders', component: orders_component_1.OrdersComponent },
    { path: 'orderdetail', component: orderdetail_component_1.OrderdetailComponent },
];
//引用文件
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            router_1.RouterModule.forRoot(exports.ROUTES)
        ],
        declarations: [
            app_component_1.AppComponent,
            http_component_1.HttpComponent,
            login_component_1.LoginComponent,
            orderlist_component_1.OrderlistComponent,
            orders_component_1.OrdersComponent,
            orderdetail_component_1.OrderdetailComponent
        ],
        providers: [http_service_1.HttpService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
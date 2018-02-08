"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    //初始化数据
    function LoginComponent(router) {
        this.router = router;
        this.name = 'caiex.com';
        this.address = {
            province: '福建',
            city: '厦门'
        };
        this.showSkills = true;
        this.skills = ['AngularJS 1.x', 'Angular 2.x', 'Angular 4.x'];
    }
    LoginComponent.prototype.toggleSkills = function () {
        this.showSkill = !this.showSkill;
    };
    LoginComponent.prototype.onSubmit = function (value) {
        //路由重定向
        this.router.navigate(['./orderdetail']);
        console.dir(value);
    };
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.confirm = function () {
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map
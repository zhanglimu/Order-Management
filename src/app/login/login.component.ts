interface Address {
  province: string;
  city: string;
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ElMessageService } from 'element-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name: string;
  display: boolean;
  //初始化数据
  constructor(private router: Router, private LOGIN: LoginService, private message: ElMessageService) {
    // this.name = '362217990@qq.com';
    this.display = true;
  }
  onSubmit(res) {
    this.LOGIN.upLogion(res).subscribe(val => {
      console.log(val);
      if (val.result.resultCode == 0) {
        if (val.data != null) {
          localStorage.setItem("username", val.data.nickName);
          localStorage.setItem("loginCount", val.data.loginCount);
          //路由重定向
          this.router.navigate(['./orderdetail'])
        } else {
          this.message.error(val.result.resultMsg)
        }
      } else {
        this.message.error(val.result.resultMsg)
      }
    },
      error => {
        console.error("This line is never called ", error);
      },
    )
  }

  ngOnInit(): void {

  }

  confirm(): void {
  }
}

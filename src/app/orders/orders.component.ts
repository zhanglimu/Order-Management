import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'; // (1)

import 'rxjs/add/operator/map'; // (2)
import{ Router} from '@angular/router';
import{ LoginoutService} from '../service/loginout.service';
interface Member {
    id: string;
    login: string;
    avatar_url: string;
}

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
  })
export class OrdersComponent implements OnInit {
    public switchIndex: string = '0';
   // members: Member[];
  username:string;
  loginNum:string;
  constructor(private router:Router,private Loginout:LoginoutService) { 
    this.username = localStorage.getItem("username");
    this.loginNum = localStorage.getItem("loginCount")
  } // (3)
/**
   * 切换选项卡
   * @param index
   */
  switch(index: string): void {
    this.switchIndex = index;
    localStorage.setItem('SWITCH_INDEX', this.switchIndex);
  }
  //退出登录
  Signout(){
    this.Loginout.Loginout().subscribe(response=>{
      localStorage.removeItem("username");
      localStorage.removeItem("loginCount");
      this.router.navigate(['./login'])
      }) 
  }

  ngOnInit() {
      
  }
}
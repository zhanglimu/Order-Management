import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {AppConfig} from "../const/app-config";
import { AppComponent } from '../app.component';
import 'rxjs/add/observable/forkJoin';
import {Observable} from "rxjs/Observable";
import {HttpParams} from "@angular/common/http";
@Injectable()
export class OrderdetailService{
    param : any;
    private cookie ={withCredentials: true};
    constructor(private http:Http){}
    //渠道接口
    getHttp(){
        return this.http.get(AppConfig.baseUrl + '/AgentList',this.cookie )//,this.cookie
        .map(res => res.json())
    }
    //彩种
    lottery(){
        return this.http.get(AppConfig.baseUrl + '/LotteryTypeList',this.cookie )
        .map(res => res.json())
    }
    //订单信息接口
    orderinfo(order_id,lottery_type,agentId,flag){
        console.log(order_id,lottery_type,agentId,flag)        
        return this.http.get(AppConfig.baseUrl+'/OrderInfo?tkId='+order_id+'&lottery_type='+lottery_type+'&agentId='+agentId+'&flag='+flag,this.cookie )
        .map(res=>res.json());
    }
    //Betline
    betline(order_id,lottery_type,agentId,flag){
        return this.http.get(AppConfig.baseUrl+'/GetBetline?tkId='+order_id+'&lottery_type='+lottery_type+'&agentId='+agentId+'&flag='+flag,this.cookie )
        .map(res=>res.json());
    }
    //日志记录
    orderlog(order_id,lottery_type,agentId,flag,pageSize,pageNum){
        console.log(order_id,lottery_type,agentId,flag,pageSize,pageNum,"c")
        return this.http.get(AppConfig.baseUrl+'/GetOrderLog?tkId='+order_id+'&lottery_type='+lottery_type+'&agentId='+agentId+'&flag='+flag+'&pageSize='+pageSize+'&pageNum='+pageNum,this.cookie )
        .map(res=>res.json());
    }
    //组合get拼接的参数
        zuCan(order_id,lottery_type,agentId,flag){
            const params = new HttpParams()
            .set('tkId', order_id)
            .set('lottery_type', lottery_type)
            .set('agentId',agentId)
            .set('flag', flag);
            return params;
        }
}   
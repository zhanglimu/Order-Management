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
        return this.http.get(AppConfig.baseUrl + '/AgentList',this.cookie )// ,this.cookie
        .map(res => res.json())
    }
    //彩种
    lottery(){
        return this.http.get(AppConfig.baseUrl + '/DicList?type=1',this.cookie )
        .map(res => res.json())
    }
    //operation
    operation(){
        return this.http.get(AppConfig.baseUrl + '/DicList?type=2',this.cookie )
        .map(res => res.json())
    }
    //订单信息接口
    orderinfo(order_id,lottery_type,agentId,flag){       
        return this.http.get(AppConfig.baseUrl+'/OrderInfo?tkId='+order_id+'&lottery_type='+lottery_type+'&agentId='+agentId+'&flag='+flag,this.cookie )
        .map(res=>res.json());
    }
    //Betline
    betline(order_id,lottery_type,agentId,flag){
        return this.http.get(AppConfig.baseUrl+'/GetBetline?tkId='+order_id+'&lottery_type='+lottery_type+'&agentId='+agentId+'&flag='+flag,this.cookie )
        .map(res=>res.json());
    }
    //日志记录
    orderlog(order_id,lottery_type,agentId,flag,sellingTime,event_type){
        return this.http.get(AppConfig.baseUrl+'/GetOrderLog?tkId='+order_id+'&lottery_type='+lottery_type+'&agentId='+agentId+'&flag='+flag+'&sellingTime='+sellingTime+'&event_type='+event_type,this.cookie )
        .map(res=>res.json());
    }
    //拒票详情
    detail(log_time,mcode){
        console.log(log_time,mcode)
        // return this.http.get('http://caiex-live.jingcai.trade:12320/caiexlive/matchInfo/matchStateLog?logTime='+log_time+'&matchCode='+mcode)
        return this.http.get('http://live-service.caiex.com:12320/caiexlive/matchInfo/matchStateLog?logTime='+log_time+'&matchCode='+mcode)
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
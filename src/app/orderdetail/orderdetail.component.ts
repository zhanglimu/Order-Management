import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'; // (1)
import { OrderdetailService } from '../service/orderdetail.service';
import 'rxjs/add/operator/map'; // (2)

import { Ding } from '../module/ding';

import { PageService } from '../service/page.service';
import { ElMessageService } from 'element-angular';

import { AppConfig } from "../const/app-config";
declare var $: any;
@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss'],
})
export class OrderdetailComponent implements OnInit {
  resut: any[];   //返回所有渠道信息变量
  cai: string[];  //返回所有彩种的信息变量
  logs: any[];    //返回日志数据变量
  betline: string;   //返回订单数据变量 

  order_id: string;   //订单变量
  lottery_type: string;//彩种变量
  agentId: Int16Array;//渠道变量
  flag: Int16Array;    //时间变量
  ding: Ding;       //数据字典

  count: number = 0; //总条数 
  pageCount:number; 
  pageSize: number = 11;  //每页条数
  pageNum: number = 1;  //默认第一页

  dingdan: string;
  name: string;  //渠道默认值
  ca: string;     //彩种默认值
  da: string;     //时间默认值

  Nodata: boolean; //是否显示提示信息
  Nodata1: boolean;
  Nodata2: boolean;
  data: string;  //显示提示信息
  data1: string;
  data2: string;
  constructor(private QUERY: OrderdetailService, private PAGE: PageService, private message: ElMessageService) { } // (3)

  ngOnInit() {
    this.dingdan = "";
    this.name = "100"; //渠道值
    this.ca = '1';
    this.da = '0';
    this.Nodata = false;
    this.Nodata1 = false;
    this.Nodata2 = false;
    //返回渠道信息
    this.QUERY.getHttp().subscribe(data => {
      if (data)
        this.resut = data.data;
    });
    //返回彩种
    this.QUERY.lottery().subscribe(data => {
      if (data)
        this.cai = data.data;
    })
  }
  onCha(result ) {
    this.order_id = result.dingdan;
    this.lottery_type = result.cai;
    this.agentId = result.qudao;
    this.flag = result.day;
    if (this.order_id == "") {
      this.message.error("订单ID不能为空！")
      return false;
    }
         //订单信息
    this.QUERY.orderinfo(this.order_id, this.lottery_type, this.agentId, this.flag).subscribe(data => {
      if (data.data != null) {
        this.Nodata = false;
        let DING:Ding = new Ding({
          trade_type: data.data.trade_type,
          totalInvestment:data.data.totalInvestment,
          inplay: data.data.inplay,
          trade_price:data.data.trade_price,
          total_price:data.data.total_price,
          rakeRate:data.data.rakeRate,
          bonus:data.data.bonus,
          cxBonus:data.data.cxBonus,
          state:data.data.state,
          winMoney:data.data.winMoney,
          recycleState: data.data.recycleState,
          recyclePrice:data.data.recyclePrice,
        });
        this.ding = DING;
        console.log(this.ding.totalInvestment)
      } else {
        this.ding = data.data;
        this.Nodata = true;
        this.data = "暂无新数据";
      }
    }, error => {
      this.Nodata = true;
      this.data = "数据异常请联系开发人员";
    });

    //订单Betline
    this.QUERY.betline(this.order_id, this.lottery_type, this.agentId, this.flag).subscribe(data => {
      if (data.data != null) {
        this.Nodata1 = false;
        this.betline = data.data;
      } else {
        this.betline = "";
        this.Nodata1 = true;
        this.data1 = "暂无新数据";
      }
    }, error => {
      this.Nodata1 = true;
      this.data1 = "数据异常请联系开发人员";
    });
    //调用日志方法
    this.Log(this.order_id, this.lottery_type, this.agentId, this.flag, this.pageSize, this.pageNum);
    }
  //日志处理
  Log(order_id, lottery_type, agentId, flag, pageSize, pageNum) {
    this.QUERY.orderlog(order_id, lottery_type, agentId, flag, pageSize, pageNum).subscribe(response => {
      if (response.data.length > 0) {
        console.log(response, "111")
        this.Nodata2 = false;
        this.count = response.total;
        this.pageCount = Math.round(this.count/this.pageSize);
        console.log(this.pageCount);
        this.logs = response.data;
      } else {
        this.count = 0;
        this.logs = [];
        this.Nodata2 = true;
        this.data2 = "暂无新数据";
      }
    }, error => {
      this.Nodata2 = true;
      this.data2 = "数据异常请联系开发人员";
    })
  }
  //分页
  modelChange(currentPage) {
    this.Log(this.order_id, this.lottery_type, this.agentId, this.flag, this.pageSize, currentPage)
  }
  //导出询价列表
  inquiry(res) {
    window.open(AppConfig.baseUrl + '/DownLoadQueryTicketInfo?lottery_type=' + res);
  }
  //交易
  transaction(res) {
    window.open(AppConfig.baseUrl + '/DownOrderTicketInfo?lottery_type=' + res);
  }
  //日志
  exporter(order_id, lottery_type, agentId, flag) {
    if (order_id == "") {  //校验
      this.message.error("订单ID不能为空！")
      return false;
    }
    window.open(AppConfig.baseUrl + '/DownLoadOrderLog?tkId=' + order_id + '&lottery_type=' + lottery_type + '&agentId=' + agentId + '&flag=' + flag);
  }

}

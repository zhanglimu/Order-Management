import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'; // (1)
import { OrderdetailService } from '../service/orderdetail.service';
import 'rxjs/add/operator/map'; // (2)

import { Ding } from '../module/ding';

import { ElMessageService } from 'element-angular';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';
import { AppConfig } from "../const/app-config";
import * as $ from "jquery";
//import * as layer from "layer";

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss'],
})
export class OrderdetailComponent implements OnInit {
  arr: string[];
  arra: string[];
  way: string[];

  resut: any[];   //返回所有渠道信息变量
  cai: any[];  //返回所有彩种的信息变量
  opera: any[];  //返回所有彩种的信息变量
  logs: any[];    //返回日志数据变量
  betline: string[];   //返回订单数据变量 
  details:any[];

  order_id: string;   //订单变量
  lottery_type: string;//彩种变量
  agentId: Int16Array;//渠道变量
  flag: Int16Array;    //历史数据变量
  sellingTime: string;    //历史数据变量
  event_type: string;  //operation变量

  ding: Ding;       //数据字典

  //count: number = 0; //总条数 
  //pageCount: number;
  // pageSize: number = 8;  //每页条数
  //pageNum: number = 1;  //默认第一页

  dingdan: string;
  name: string;  //渠道默认值
  ca: string;     //彩种默认值
  da: string;     //时间默认值
  er: string;    //默认operation

  Nodata: boolean; //是否显示提示信息
  Nodata1: boolean;
  Nodata2: boolean;
  Nodata3: boolean;
  data: string;  //显示提示信息
  data1: string;
  data2: string;
  data3: string;
  constructor(private QUERY: OrderdetailService, private message: ElMessageService) { } // (3)

  ngOnInit() {
    this.dingdan = "";
    this.name = "100"; //渠道值
    this.ca = '1';
    this.da = '0';
    this.er = 'all';
    this.Nodata = false;
    this.Nodata1 = false;
    this.Nodata2 = false;
    this.Nodata3 = false;
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
    //operation
    this.QUERY.operation().subscribe(data => {
      if (data)
        this.opera = data.data;
    })
  }
  onCha(result) {
    this.order_id = result.dingdan;
    this.lottery_type = result.cai;
    this.agentId = result.qudao;
    this.flag = result.day;
    this.event_type = result.eventer;  //operation值
    if (this.order_id == "") {
      this.message.error("订单ID不能为空！")
      return false;
    }
    //订单信息
    this.QUERY.orderinfo(this.order_id, this.lottery_type, this.agentId, this.flag).subscribe(re => {
      localStorage.setItem("selling", re.data.sellingTime);
      if (re.data != null) {
        this.Nodata = false;
        let DING: Ding = new Ding({
          trade_type: re.data.trade_type,
          totalInvestment: re.data.totalInvestment,
          inplay: re.data.inplay,
          trade_price: re.data.trade_price,
          total_price: re.data.total_price,
          rakeRate: re.data.rakeRate,
          bonus: re.data.bonus,
          cxBonus: re.data.cxBonus,
          state: re.data.state,
          winMoney: re.data.winMoney,
          recycleState: re.data.recycleState,
          recyclePrice: re.data.recyclePrice,
        });
        this.ding = DING;
            //调用日志方法
    // this.sellingTime = localStorage.getItem("selling")
    this.Log(this.order_id, this.lottery_type, this.agentId, this.flag, re.data.sellingTime, this.event_type);
      } else {
        this.ding = re.data;
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
        //this.betline = data.data;
        //console.log("betline="+data.data.betline);
        this.arr = data.data.betline.split("/");
        var jsonArr = new Array();

        for (var i = 0; i < this.arr.length; i++) {
          this.arra = this.arr[i].split(">");
          var a = new Array();   //拆分
          var jso = new Array();  //几串几
          var an = new Array();  //多少场
          var jsonObj = {};  //几串几赋值对象

          for (var j = 0; j < this.arra.length; j++) {
            if (j >= 2) {
              var json = {};
              json['jack'] = this.arra[j].substring(this.arra[j].indexOf("*") + 1);
              json['a'] = json['jack'].split("&");
              for (var b = 0; b < json['a'].length; b++) {
                var jj = {};
                jj["jackpot"] = json['a'][b].split("|")[0]
                jj["option"] = json['a'][b].substring(json['a'][b].indexOf("|") + 1)
                jj["mhcode"] = this.arra[j].split("*")[0];
                a.push(jj)
              }
            } else {
              jsonObj["e" + j] = this.arra[j]
            }
          }
          jsonArr.push({ jsonObj, data: a });
        }

        for (var q = 0; q < jsonArr.length; q++) {
          for (var e = 0; e < jsonArr[q].data.length; e++) {
            var matchCode = jsonArr[q].data[e];
            var chua = jsonArr[q].jsonObj;
            var isExist = false;
            var isC = false;
            //去重多少场次
            for (var m = 0; m < an.length; m++) {
              if (jsonArr[q].data[e].mhcode == an[m].mhcode && jsonArr[q].data[e].jackpot == an[m].jackpot &&
                jsonArr[q].data[e].option == an[m].option) {
                isExist = true;
                break;
              }
            }
            //去重几串几
            for (var r = 0; r < jso.length; r++) {
              if (jsonArr[q].jsonObj.e0 == jso[r].e0 && jsonArr[q].jsonObj.e1 == jso[r].e1) {

                isC = true;
                break;
              }
            }
            if (!isExist) {
              an.push(matchCode);
            }
            if (!isC) {
              jso.push(chua);
            }

          }
        }
        //去重合并
        var c = new Array();
        for (var e = 0; e < jso.length; e++) {
          var quc = jso[e];
          var isExist = false;
          for (var m = 0; m < c.length; m++) {
            if (quc.e1 == c[m].e1) {
              c[m].e0 += "," + quc.e0;
              isExist = true;
              break;
            }
          }
          if (!isExist) {
            c.push(quc);
          }
        }
        this.way = c;
        //去重合并多少场比赛
        var s = new Array();
        for (var e = 0; e < an.length; e++) {
          var matchCode = an[e];
          var isExist = false;
          for (var m = 0; m < s.length; m++) {
            if (matchCode.mhcode == s[m].mhcode && matchCode.jackpot == s[m].jackpot) {
              s[m].option += "," + matchCode.option;
              isExist = true;
              break;
            }
          }
          if (!isExist) {
            s.push(matchCode);
          }
        }
        //@strat分组
        var map = {},
          dest = [];

        for (var i = 0; i < s.length; i++) {
          var ai = s[i];
          if (!map[ai.mhcode]) {
            dest.push({
              mhcode: ai.mhcode,
              jk: ai.jackpot,
              data: [ai]
            });
            map[ai.mhcode] = ai;
          } else {
            for (var j = 0; j < dest.length; j++) {
              var dj = dest[j];
              if (dj.mhcode == ai.mhcode) {
                dj.data.push(ai);
                break;
              }
            }
          }
        }
        //@end
        this.betline = dest;  //获取多少场比赛数据

      } else {
        this.betline = data.data;
        this.Nodata1 = true;
        this.data1 = "暂无新数据";
      }
    }, error => {
      this.Nodata1 = true;
      this.data1 = "数据异常请联系开发人员";
    });

  }
  //日志处理
  Log(order_id, lottery_type, agentId, flag, sellingTime, event_type) {
    this.QUERY.orderlog(order_id, lottery_type, agentId, flag, sellingTime, event_type).subscribe(response => {
      //  console.log(response.data,"日志数据")
      console.log("日志参数",order_id, lottery_type, agentId, flag, sellingTime, event_type)
      if (response.data!=null) {
        if (response.data.length > 0) {
            var reg = /[^0-9]/ig;
            for (var i = 0; i < response.data.length; i++) {
              if (!(response.data[i].prompt == null)) {
                if (response.data[i].prompt.length > 20 && response.data[i].prompt.match(/^[\u4e00-\u9fa5]|[0-9]+$/)) {
                  if (response.data[i].prompt.split(":").length > 1) {
                    var mcode = response.data[i].prompt.replace(reg, "");
                    response.data[i].mcode = mcode;
                  }
                  response.data[i].p = true
                } else {
                  response.data[i].p = false
                }
              } else {
                response.data[i].p = false
              }
            }

          this.Nodata2 = false;
          this.logs = response.data;
        } else {
          this.logs = [];
          this.Nodata2 = true;
          this.data2 = "暂无新数据";
        }
      }else {
        this.logs = [];
        this.Nodata2 = true;
        this.data2 = "暂无新数据";
      }
    }, error => {
      this.Nodata2 = true;
      this.data2 = "数据异常请联系开发人员";
    })
  }
  //点击详情
  showdiv(log_time,mcode) {
    this.QUERY.detail(log_time,mcode).subscribe(response => {
      if (response.length > 0) {
        this.Nodata3 = false;
        this.details = response;
      }else {
      this.details = [];
      this.Nodata3 = true;
      this.data3 = "暂无新数据";
      }
    }, error => {
      this.Nodata3 = true;
      this.data3 = "数据异常请联系开发人员";
    })
    document.getElementById("bg").style.display = "block";
    document.getElementById("show").style.display = "block";
  }
  hidediv() {
    document.getElementById("bg").style.display = 'none';
    document.getElementById("show").style.display = 'none';
  }
  //分页
  // modelChange(currentPage) {
  //   this.Log(this.order_id, this.lottery_type, this.agentId, this.flag)
  // }
  //导出询价列表
  inquiry(ca) {
    var starter: any = $("#startime").val();
    var ender: any = $("#endtime").val();
    
    if (starter == "" ||ender == "") {  //校验
      this.message.error("开始和结束时间都要选！")
      return false;
    }
    //开始时间不能小于结束时间
    var start=new Date(starter.replace("-", "/").replace("-", "/")); 
    var end=new Date(ender.replace("-", "/").replace("-", "/")); 
    if(end<start){
      this.message.error("开始时间不能小于结束时间！")
      return false;
    } 
    //请选择30天内
    var date1 = new Date(starter);
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + 30);
    var a = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
    var etime=new Date(a.replace("-", "/").replace("-", "/")); 
    if (end > etime) {
      this.message.error("请选择30天内！")
      return false;
    }
    window.open(AppConfig.baseUrl + '/DownLoadQueryTicketInfo?lottery_type=' + ca + '&startime=' + starter + '&endtime=' + ender);
  }
  //交易
  transaction(ca) {
    var starter: any = $("#startime").val();
    var ender: any = $("#endtime").val();
    
    if (starter == "" ||ender == "") {  //校验
      this.message.error("开始和结束时间都要选！")
      return false;
    }
    //开始时间不能小于结束时间
    var start=new Date(starter.replace("-", "/").replace("-", "/")); 
    var end=new Date(ender.replace("-", "/").replace("-", "/")); 
    if(end<start){
      this.message.error("开始时间不能小于结束时间！")
      return false;
    } 
    //请选择30天内
    var date1 = new Date(starter);
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + 30);
    var a = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
    var etime=new Date(a.replace("-", "/").replace("-", "/")); 
    if (end > etime) {
      this.message.error("请选择30天内！")
      return false;
    }
    window.open(AppConfig.baseUrl + '/DownOrderTicketInfo?lottery_type=' + ca + '&startime=' + starter + '&endtime=' + ender);
  }
  //导出日志
  exporter(order_id, lottery_type, agentId, flag) {
    this.sellingTime = localStorage.getItem("selling")
    console.log(this.sellingTime,"ffff")
    if (this.sellingTime == "" ||this.sellingTime == null) {  //校验
      this.message.error("请先点击查询数据！")
      return false;
    }
    window.open(AppConfig.baseUrl + '/DownLoadOrderLog?tkId=' + order_id + '&lottery_type=' + lottery_type + '&agentId=' + agentId + '&flag=' + flag + '&sellingTime=' + this.sellingTime + '&event_type=' + this.event_type);
  }
}

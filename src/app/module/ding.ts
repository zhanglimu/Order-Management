//订单信息字段处理
export class Ding {
  public trade_type: number;
      public totalInvestment:number;
      public inplay: number;
      public trade_price:number;
      public total_price:number;
      public rakeRate:number;
      public bonus:number;
      public cxBonus:number;
      public state:number;
      public winMoney:number;
      public recycleState: number;
      public recyclePrice:number;

      public trade_type_name:string;
      public inplay_name:string;
      public state_name:string;
      public recycleState_name:string;
     
  constructor({trade_type, totalInvestment,inplay,trade_price
    ,total_price,rakeRate,bonus,cxBonus,state,winMoney,recycleState,recyclePrice
  }) {
    if (totalInvestment == null) {
      totalInvestment = "--";
    }
    if (trade_price == null) {
       trade_price= "--";
    }
    if (total_price == null) {
      total_price = "--";
    } 
    if (rakeRate == null) {
      rakeRate = "--";
    }
    if (bonus == null) {
      bonus = "--";
    } 
    if (cxBonus == null) {
      cxBonus = "--";
    } 
    if (winMoney == null) {
      winMoney = "--";
    }
    if (recyclePrice == null) {
      recyclePrice = "--";
    } 
    switch (trade_type) {
      case null:
      this.trade_type_name = "--";
      break;
      case 1:
        this.trade_type_name = "交易成功";
        break;
      case 2:
        this.trade_type_name = "待取消审批";
        break;
      case 3:
        this.trade_type_name = "取消审批通过";
        break;
    }
    switch (inplay) {
      case null:
      this.inplay_name = "--";
      break;
      case 0:
        this.inplay_name = "死球";
        break;
      case 1:
        this.inplay_name = "即场";
        break;
    }
    switch (state) {
      case null:
      this.state_name = "--";
      break;
      case 1:
        this.state_name = "中奖";
        break;
      case 2:
        this.state_name = "未中奖";
        break;
      case 3:
        this.state_name = "Alive";
        break;
    }
    switch (recycleState) {
      case null:
      this.recycleState_name = "--";
      break;
      case 0:
        this.recycleState_name = "未回收";
        break;
      case 1:
        this.recycleState_name = "已回收";
        break;
    }
      this.trade_type = trade_type;
      this.totalInvestment=totalInvestment;
      this.inplay=inplay;
      this.trade_price=trade_price;
      this.total_price=total_price;
      this.rakeRate=rakeRate;
      this.bonus=bonus;
      this.cxBonus=cxBonus;
      this.state=state;
      this.winMoney=winMoney;
      this.recycleState=recycleState;
      this.recyclePrice=recyclePrice;
  }
}




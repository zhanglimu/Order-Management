import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {AppConfig} from "../const/app-config";
import { AppComponent } from '../app.component';
@Injectable()
export class PageService{
    pages:any=[];
    Cnum:number = 5;  //初始化分页数
    constructor(private http:Http){}
    reloadPno(pageNum,p_all_page){  
        this.pages=this.calculateIndexes(pageNum,p_all_page,this.Cnum); 
        return this.pages;
      };   
      
calculateIndexes  (current, length, displayLength) {  
  
    var indexes = [];  
    var start = Math.round(current - displayLength / 2);  
   
    var end = Math.round(current + displayLength / 2);  
      if (start <= 1) {  
          start = 1;  
          end = start + displayLength - 1;  
          if (end >= length - 1) {  
              end = length - 1;  
          }  
      }
      if (end >= length - 1) {  
          end = length;  
          start = end - displayLength + 1;  
          if (start <= 1) {  
              start = 1;  
          }  
      }  
      for (var i = start; i <= end; i++) {  
          indexes.push(i);  
      } 
     
      return indexes;  
    };
}
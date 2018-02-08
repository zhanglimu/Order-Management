import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {LoginGroup} from "../modules/login-group";
import {Login} from "../modules/login";
 import {AppConfig} from "../const/app-config";
 import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginoutService {
  private cookie ={withCredentials: true};
  constructor(private http: Http) {}

  Loginout(){
    return this.http.get(AppConfig.baseUrl +'/user/loginout',this.cookie
    ).map(res =>res.json());
 } 

}

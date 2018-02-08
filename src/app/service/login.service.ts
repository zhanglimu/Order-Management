import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {LoginGroup} from "../modules/login-group";
import {Login} from "../modules/login";
 import {AppConfig} from "../const/app-config";
 import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  constructor(private http: Http) {}

  upLogion(res):Observable<any>{
    let formData: FormData = new FormData(); 
    formData.append('email', res.username); 
    formData.append('pwd', res.password); 
    return this.http.post(AppConfig.baseUrl +'/user/tologin',formData,{withCredentials: true}
    ).map(res =>res.json());
  }

}

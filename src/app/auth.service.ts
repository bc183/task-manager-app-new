import { Router } from '@angular/router';
import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';
import {shareReplay , tap} from  'rxjs/operators';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private service : WebRequestService, private router : Router) { }

  signup(email: string,password: string){
    return this.service.signup(email,password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>)=>{
        this.setSession(res.body._id,res.headers.get('x-access-token'),res.headers.get('x-refresh-token'));
        console.log("signed up and logged in");
        
      })
    );
  }

  login(email: string, password : string){
    return this.service.login(email,password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>)=>{
        this.setSession(res.body._id,res.headers.get('x-access-token'),res.headers.get('x-refresh-token'));
        
      })
    );
  }

  logout(){


    this.removeSession();
    this.router.navigate(['/login']);
  }

  getUserId(){
    return localStorage.getItem('user-Id');
  }
  getAccessToken(){
    return localStorage.getItem('x-access-token');
  }
  getRefreshToken(){
    return localStorage.getItem('x-refresh-token');
  }
  setAccessToken(accessToken : string){
    localStorage.setItem('x-access-token',accessToken);
  }
  getNewAccessToken(){
    return this.http.get(`${this.service.ROOT_URL}/users/me/access-token`,{
      headers : {
        'x-refresh-token' : this.getRefreshToken(),
        '_id' : this.getUserId()
      },
      observe : "response"
    }).pipe(tap((res: HttpResponse<any>)=>{
      this.setAccessToken(res.headers.get('x-access-token'));
    }))
  }

  
  private setSession(userId: string, accessToken : string, refreshToken: string){
    localStorage.setItem('user-Id',userId);
    localStorage.setItem('x-access-token',accessToken);
    localStorage.setItem('x-refresh-token',refreshToken);
  }

  private removeSession(){
    localStorage.removeItem('user-Id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

}

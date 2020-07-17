import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private service : AuthService, private router: Router) { }

  unAuth : boolean = false;
  ngOnInit(): void {
  }

  onLoginButtonClicked(email : string, password: string){
    
    this.service.login(email,password).subscribe((res: HttpResponse<any>)=>{
      
      if(res.status===200){
        this.router.navigate(['/lists']);
      }
    },(err)=>{
      if(err.status===400){
        this.unAuth=true;
      }
    });
    //console.log(localStorage.getItem('user-Id'));
    
  }
}

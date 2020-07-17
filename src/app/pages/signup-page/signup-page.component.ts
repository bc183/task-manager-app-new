import { Router } from '@angular/router';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(private service : AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  onSignUpClickedButton(email: string, password : string){
    this.service.signup(email,password).subscribe((res: HttpResponse<any>)=>{
      if(res.status===200){
        this.router.navigate(['/lists']);
      }
    });
  }
}

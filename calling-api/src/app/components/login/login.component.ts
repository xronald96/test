import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: FormGroup;
  error = false;
  constructor(
    private router: Router,
    public formBuilder: FormBuilder, 
    private loginService: LoginService,
    ) { }

  ngOnInit() {
    localStorage.removeItem('token')
    this.credentials = this.formBuilder.group({
      username: [null, [Validators.required]],
      password:  [null, [Validators.required]],
    });
  }

  login(){
    if(this.credentials.valid){
      this.error=false;
      this.loginService.login(this.credentials.value).subscribe(res =>{
        localStorage.setItem("token", res['accessToken']);
        this.router.navigate(['/transactions']);
      },
      err=>{
        this.error=true;
      })
    }
  }
}

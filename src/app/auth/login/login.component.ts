import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { LoginRequest } from './login.request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup | any;
  isError : boolean;
  loginRequest: LoginRequest;
  registerSuccessMessage: string;

  constructor(private fb:FormBuilder, private authService : AuthService, private snackBar: MatSnackBar, private activatedRoute : ActivatedRoute, private router: Router) {
    this.isError = false;
    this.loginRequest = {
      username : '',
      password : ''
    };
    this.registerSuccessMessage = '';
   }

   login() : void {
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;
    this.authService.login(this.loginRequest)
        .subscribe( 
              data => {
              if(data){
                this.isError = false;
                this.router.navigateByUrl('/');
                this.snackBar.open("Logged in successfully !", "Dismiss", {
                  duration : 2000,
                  panelClass : ['success-snackbar']
                  });
              }
              else {
                this.isError = true;

              }
            }
            ,
            (error) => {
              console.log(error);
              this.snackBar.open("Login failed !", "Dismiss", {
                panelClass : ['failure-snackbar'],
                duration: 2000
              })
            }
        );

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username : new FormControl('', Validators.required),
      password:  new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params['registered'] !== undefined && params['registered'] === 'true') {
          this.snackBar.open("Registration successful !", "Dismiss", {
            panelClass : ['success-snackbar'],
            duration : 2000
          });
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });
  }

}

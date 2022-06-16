import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup.request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup | any ;
  signupRequestPayload: SignupRequestPayload; 

  constructor(private fb:FormBuilder, private authService: AuthService, private router: Router, private snackBar : MatSnackBar) {
    this.signupRequestPayload = {
      username: '',
      password: '',
      email: ''
    }
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  signup() : void {
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(
                  (data) => {
                  this.snackBar.open("Registeration successful !", "Dismiss", {
                    panelClass : ['success-snackbar'],
                    duration: 2000
                  })
                  this.router.navigate(['/login'], { queryParams : { registered : 'true' }})
                  console.log(data);
                  },

                  (error) => {
                    console.log(error);
                    this.snackBar.open("Registeration failed !", "Dismiss", {
                      panelClass : ['failure-snackbar'],
                      duration: 2000
                    })
                  }
      );
  }

}

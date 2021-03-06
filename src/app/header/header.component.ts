import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faUser = faUser;
  isLoggedIn: boolean | any;
  username: string | any;

  constructor(private authService: AuthService, private router: Router) { 
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
  }

  ngOnInit() {
    if(this.username === "" || this.username === undefined){
      this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
      this.authService.username.subscribe((data: string) => this.username = data);
    }
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}

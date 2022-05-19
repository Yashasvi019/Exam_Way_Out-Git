import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn=false;
  user:any=null;

  constructor(public login:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.login.isLoggedIn();
      this.user=this.login.getUser();
    });
  }

public logout(){
  this.login.logout();
  this.isLoggedIn=false;
  this.user=null;
  window.location.reload();
}

public ProfilePage() {
  if(this.login.getUserRole()=='ADMIN') 
          {
            //admin dashboard
            //window.location.href='/admin-dashboard/profile';
            this.router.navigate(['admin-dashboard/profile']);
          }
          else if(this.login.getUserRole()=='NORMAL')
          {
            //normal user dashboard
            //window.location.href='/user-dashboard/profile';
            this.router.navigate(['user-dashboard/profile']);
          }
}

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any=null;
  constructor(private login:LoginService, private router:Router) { }

  ngOnInit(): void {

    this.user=this.login.getUser();
    // this.login.getCurrentUser().subscribe(
    //   (user:any)=>{
    //     this.user=user;
    //   },
    //   (error)=>{
    //     alert("error: "+error);
    //   }
    // );

  }

  UpdateClicked() {
    if(this.login.getUserRole()=='ADMIN') 
          {
            //admin dashboard
            //window.location.href='/admin-dashboard';
            this.router.navigate(['/admin-dashboard/update-profile/'+this.user.username]);
            this.login.loginStatusSubject.next(true);
          }
          else if(this.login.getUserRole()=='NORMAL')
          {
            //normal user dashboard
            //window.location.href='/user-dashboard';
            this.router.navigate(['user-dashboard/update-profile/'+this.user.username]);
            this.login.loginStatusSubject.next(true);
          }
  }

}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginData={
  username:'',
  password:'',
};

  constructor(private snack:MatSnackBar, private login:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("Login button clicked");
    if(this.loginData.username.trim()=='' || this.loginData.username==null) {
      this.snack.open("Proper Username is required !!","Okay",{
        duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
      });
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null) {
      this.snack.open("Proper password is required !!","Okay",{
        duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
      });
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("sucess");
        console.log(data);

        //login...., when we get token
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe((user:any)=>{
          this.login.setUser(user);
          console.log(user);

          //redirect.. ADMIN: admin-dashboard
          //redirect.. NORMAL: normal-dashboard

          if(this.login.getUserRole()=='ADMIN') 
          {
            //admin dashboard
            //window.location.href='/admin-dashboard';
            this.router.navigate(['admin-dashboard']);
            this.login.loginStatusSubject.next(true);
          }
          else if(this.login.getUserRole()=='NORMAL')
          {
            //normal user dashboard
            //window.location.href='/user-dashboard';
            this.router.navigate(['user-dashboard']);
            this.login.loginStatusSubject.next(true);
          }
          else 
          {
            this.login.logout();
            location.reload();
          }

        });


      },
      (error)=>{
        console.log("Error!");
        console.log(error);
        this.snack.open("Invalid Details!! Try Again!","Okay",{
          duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
        });
      }
    );
    
  }

  ClearFields() {
    this.loginData={
      username:'',
      password:'',
    };
  }

}

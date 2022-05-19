import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  user:any=null;
  token:any=null;

  constructor(private login:LoginService, private snack: MatSnackBar, private _user:UserService, private _router:Router) { }

  ngOnInit(): void {

    this.user=this.login.getUser();
    this.token=this.login.getToken();

  }

  formSubmit(){
   // console.log(this.user);

    if(this.user.email.trim()=='' || this.user.firstName.trim()=='' || this.user.lastName.trim()=='' || this.user.username.trim()=='' || 
          this.user.phoneNumber.trim()=='' || this.user.gender.trim()==''){
          //  alert('All fields need to be fill !!');
          this.snack.open('All fields need to be fill !!', 'Okay', {
            duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
          });
           return;
    }
    // console.log(this.user);
    // console.log(this.token);
    

    //const update_user=(console.log({token:this.token, ...this.user.value}));

    this._user.updateUser(this.user).subscribe(
      (data:any)=>{
        Swal.fire('Success!!', 'User updated successfully.... ', 'success').then(
          (e)=>{
            console.log(data);
            console.log('success');
            // this._router.navigate(['/admin-dashboard/quizzes'])
            if(this.user.authorities.authority=="NORMAL") {
              this._router.navigate(['/user-dashboard/profile'])
            }
            if(this.user.authorities.authority=="ADMIN") {
              this._router.navigate(['/admin-dashboard/profile'])
            }
          }
        );
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!','Server Error! Error in updating profile!','error');
      },
    );
  }

}

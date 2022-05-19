import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( private userService:UserService, private snack: MatSnackBar, private router: Router) { }

public user={
  email:'',
  firstName:'',
  lastName:'',
  username:'',
  phoneNumber:'',
  gender:'',
	password:'',
  confirmPassword:'',
  about:'',
}

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.user.email=='' || this.user.firstName=='' || this.user.lastName=='' || this.user.username=='' || 
          this.user.phoneNumber=='' || this.user.gender=='' || this.user.password=='' || this.user.confirmPassword==''){
          //  alert('All fields need to be fill !!');
          this.snack.open('All fields need to be fill !!', 'Okay', {
            duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
          });
           return;
         }
    if(this.user.password!=this.user.confirmPassword){
      // alert('Password and Confirm Password does not match !!');
      Swal.fire('Oops...', 'Password and Confirm Password does not match !!', 'error')
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
      this.user.email='';
      this.user.firstName='';
      this.user.lastName='';
      this.user.username='';
      this.user.phoneNumber='';
      this.user.gender='';
      this.user.password='';
      this.user.confirmPassword='';
      this.user.about='';
        // alert("success");
        // Swal.fire('Congratulations.....', 'You are successfully registered with Id Number:'+data.id, 'success')
        // Swal.fire('Congratulations.....', 'You are successfully registered!!!!', 'success');
        Swal.fire({
          title: "Congratulations.....",
          text: "You are successfully registered!!!!",
          icon: "success",
        }).then((result)=> {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          } else if (result.isDenied) {
            Swal.fire('Oops...', 'You are not registered!!!!!!', 'error')
          }
          
        });
      },
      (error)=>{
        //error
        console.log(error);
        // alert("Something went wrong !!");
        // this.snack.open(error.error.text, '', {
        //   duration: 3000,
        // });
        //alert(error);
        Swal.fire('Oops...', error.error.text, 'error')
      }
    )

  }

  ClearFields() {
    this.user={
      email:'',
      firstName:'',
      lastName:'',
      username:'',
      phoneNumber:'',
      gender:'',
      password:'',
      confirmPassword:'',
      about:'',
    }
  }

}

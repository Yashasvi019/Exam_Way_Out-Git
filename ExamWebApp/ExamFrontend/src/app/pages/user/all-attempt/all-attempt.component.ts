import { Component, OnInit } from '@angular/core';
import { AttemptService } from 'src/app/services/attempt.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-attempt',
  templateUrl: './all-attempt.component.html',
  styleUrls: ['./all-attempt.component.css']
})
export class AllAttemptComponent implements OnInit {

  userId:any=0;
  user:any=[];

  userid_attempt:any=[];

  constructor(private _login:LoginService,private _attempt:AttemptService) { }

  ngOnInit(): void {

    this.user=this._login.getCurrentUser().subscribe(
      (data1:any)=>{
        this.user=data1;
        console.log(data1);
        this.userId=this.user.id;
        this._attempt.getAttemptByUserId(this.userId).subscribe(
          (data2:any)=>{
            this.userid_attempt=data2;
            console.log(data2);
            console.log('get attempt by user');
          },
          (error2)=>{
            console.log(error2);
            alert('error in getting current user attempt!!');
          }
        );
      },
      (error1)=>{
        console.log(error1);
        alert('error in getting current user!!');
      }
    );

  }

  delete(attemptId:any) {

    console.log(attemptId);
      // alert(attemptId);

      Swal.fire({
        icon:'warning',
        title:'Are you sure you want to delete this attempt?',
        confirmButtonText:'Delete',
        showCancelButton:true,
      }).then((result)=>{
  
        if(result.isConfirmed) {
          //delete
          this._attempt.deleteAttempt(attemptId).subscribe(
            (data)=>{
              Swal.fire('Success','Attempt deleted Successfully.......','success').then((result)=>{
                window.location.reload();
              })
              
            },
            (error)=>{
              Swal.fire("Error!","Error in deleting this attempt!!! ",'error');
              console.log(error);   
            }
          );
        }
        
  
      });
    
  }

}

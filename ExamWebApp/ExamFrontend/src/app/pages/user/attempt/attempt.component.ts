import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttemptService } from 'src/app/services/attempt.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.component.html',
  styleUrls: ['./attempt.component.css']
})
export class AttemptComponent implements OnInit {

  userId:any=0;
  user:any=[];
  quizId:any=0;

  userid_attempt:any=[];
  attempt:any=[];

  count:any=0;
  // count=0;

  constructor(private _login:LoginService,private _attempt:AttemptService,private _route:ActivatedRoute) { }

  ngOnInit(): void {

    this.quizId=this._route.snapshot.params.quizid;

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
            for (let attempt of this.userid_attempt) {
                  if (attempt.quiz.quizid==this.quizId) {
                    this.count=this.count+1;
                  }
                }
            console.log('count value = '+this.count);
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

    //  this.load_attempt();

  }

  // load_attempt() {
  //   for (let attempt of this.userid_attempt) {
  //     if (attempt.quiz.quizid==this.quizId) {
  //       this.count=this.count+1;
  //     }
  //   }
  // }

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


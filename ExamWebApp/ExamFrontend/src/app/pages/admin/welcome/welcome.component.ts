import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  users:any=[];
  active_quizzes:any=[];
  categories:any=[];
  quizzes:any=[];

  constructor(private snack:MatSnackBar, private _user:UserService, private _quiz:QuizService, private _category:CategoryService) { }

  ngOnInit(): void {

    this._user.getAllUSer().subscribe(
      (data:any)=>{
        this.users=data;
        console.log(this.users);
      },
      (error)=>{
        console.log(error);
        this.snack.open("Proper Username is required !!","Okay",{
          duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
        });
      }
    );

    this._quiz.getActiveQuizzes().subscribe(
      (data:any)=>{
        this.active_quizzes=data;
        console.log(this.active_quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error!","Error loading data!!! ",'error');
      }
    );

    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error!","Error loading data!!! ",'error');
      }
    );

    this._category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error!","Error loading data!!! ",'error');
      }
    );

  }

}

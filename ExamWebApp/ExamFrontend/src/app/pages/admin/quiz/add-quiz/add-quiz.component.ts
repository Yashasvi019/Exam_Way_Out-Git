import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories:any=[];

  quiz={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:false,
    category:{
      cid:'',
    },
  };

  constructor(private _categories:CategoryService, private _snack:MatSnackBar,private _quiz:QuizService, private _router:Router) { }

  ngOnInit(): void {

    this._categories.categories().subscribe(

      (data:any)=>{
        //categories loaded succesfully
        this.categories=data;
        console.log(data);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!','Error in loading Categories!!!','error');
      }
    );

  }

  public addQuiz() {
    
    if(this.quiz.title.trim() == '' || this.quiz.title==null) {
      this._snack.open("Proper Title is required !!","Okay",{
        duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
      });
      return;
    }

    if(this.quiz.description.trim() == '' || this.quiz.description==null) {
      this._snack.open("Proper Description is required !!","Okay",{
        duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
      });
      return;
    }

    if(this.quiz.maxMarks.trim() == '' || this.quiz.maxMarks==null) {
      this._snack.open("Proper Maximun Marks are required !!","Okay",{
        duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
      });
      return;
    }

    if(this.quiz.numberOfQuestions.trim() == '' || this.quiz.numberOfQuestions==null) {
      this._snack.open("Proper Number of Questions are required !!","Okay",{
        duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
      });
      return;
    }

    //validation done
    //calling the server
    this._quiz.addQuiz(this.quiz).subscribe(

      (data:any)=>{
        this.quiz.title='';
        this.quiz.description='';
        this.quiz.maxMarks='';
        this.quiz.active=false;
        this.quiz.numberOfQuestions='';
        this.quiz.category.cid='';
        Swal.fire('Success!!', 'Quiz added successfully.... ', 'success').then(
          (e)=>{
          this._router.navigate(['/admin-dashboard/quizzes']);
        });
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!','Server Error!!!','error');
      },

    );

  }

  ClearFields() {
    this.quiz={
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:false,
      category:{
        cid:'',
      },
    };
  }
  
}

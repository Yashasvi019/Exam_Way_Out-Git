import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute, private _quiz:QuizService, private _category:CategoryService, private _router:Router, private _snack:MatSnackBar) { }

  quizId=0;
  quiz: any=[];
  categories:any=[];

  ngOnInit(): void {

    this.quizId=this._route.snapshot.params.quizid;
    //alert(this.quizId);
    this._quiz.getQuiz(this.quizId).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      },
    );

    this._category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error!!','Error in loading Categories!!!','error');
    },
    );

  }

  //update on form submit
  public updateQuiz() {
    
    //validate data
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

    //update
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire('Success!!', 'Quiz updated successfully.... ', 'success').then(
          (e)=>{
          this._router.navigate(['/admin-dashboard/quizzes'])
        });
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!','Server Error! Error in updating quiz!','error');
      },
    );

  }

}
